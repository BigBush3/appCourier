const fs = require("fs");
const path = require("path");
const {
  withAppBuildGradle,
  withDangerousMod,
  withGradleProperties,
} = require("expo/config-plugins");

const KEYSTORE_NAME = "florapoint-release.jks";

const PROP_STORE_FILE = "FLORAPOINT_STORE_FILE";
const PROP_STORE_PASSWORD = "FLORAPOINT_STORE_PASSWORD";
const PROP_KEY_ALIAS = "FLORAPOINT_KEY_ALIAS";
const PROP_KEY_PASSWORD = "FLORAPOINT_KEY_PASSWORD";

const RELEASE_CONFIG = `        release {
            storeFile file(project.hasProperty('${PROP_STORE_FILE}') ? ${PROP_STORE_FILE} : '${KEYSTORE_NAME}')
            storePassword project.hasProperty('${PROP_STORE_PASSWORD}') ? ${PROP_STORE_PASSWORD} : ''
            keyAlias project.hasProperty('${PROP_KEY_ALIAS}') ? ${PROP_KEY_ALIAS} : ''
            keyPassword project.hasProperty('${PROP_KEY_PASSWORD}') ? ${PROP_KEY_PASSWORD} : ''
        }
`;

const copyKeystore = (config) =>
  withDangerousMod(config, [
    "android",
    (cfg) => {
      const source = path.join(cfg.modRequest.projectRoot, KEYSTORE_NAME);
      const target = path.join(
        cfg.modRequest.platformProjectRoot,
        "app",
        KEYSTORE_NAME
      );

      if (!fs.existsSync(source)) {
        throw new Error(
          "withAndroidSigning: не найден " + KEYSTORE_NAME + " в корне проекта"
        );
      }

      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(source, target);

      return cfg;
    },
  ]);

const addProperties = (config, options) =>
  withGradleProperties(config, (cfg) => {
    const pairs = [
      [PROP_STORE_FILE, KEYSTORE_NAME],
      [PROP_STORE_PASSWORD, options.storePassword],
      [PROP_KEY_ALIAS, options.keyAlias],
      [PROP_KEY_PASSWORD, options.keyPassword],
    ];

    pairs.forEach(([key, value]) => {
      if (!value) return;

      const existing = cfg.modResults.find(
        (item) => item.type === "property" && item.key === key
      );

      if (existing) existing.value = value;
      else cfg.modResults.push({ type: "property", key: key, value: value });
    });

    return cfg;
  });

const addSigningConfig = (config) =>
  withAppBuildGradle(config, (cfg) => {
    let contents = cfg.modResults.contents;

    if (contents.indexOf(PROP_STORE_FILE) === -1) {
      contents = contents.replace(
        /signingConfigs \{/,
        "signingConfigs {\n" + RELEASE_CONFIG
      );
    }

    contents = contents.replace(
      /(buildTypes \{[\s\S]*?release \{\n)(\s*)signingConfig signingConfigs\.debug/,
      "$1$2signingConfig signingConfigs.release"
    );

    cfg.modResults.contents = contents;
    return cfg;
  });

const CREDENTIALS_FILE = "keystore.properties";

const readCredentials = () => {
  const file = path.join(__dirname, "..", CREDENTIALS_FILE);

  if (!fs.existsSync(file)) return {};

  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (trimmed === "" || trimmed.indexOf("#") === 0) return acc;

      const at = trimmed.indexOf("=");
      if (at === -1) return acc;

      acc[trimmed.slice(0, at).trim()] = trimmed.slice(at + 1).trim();
      return acc;
    }, {});
};

const resolveOptions = (options) => {
  const file = readCredentials();

  return {
    storePassword:
      options.storePassword ||
      file.storePassword ||
      process.env.FLORAPOINT_STORE_PASSWORD ||
      "",
    keyAlias:
      options.keyAlias || file.keyAlias || process.env.FLORAPOINT_KEY_ALIAS || "",
    keyPassword:
      options.keyPassword ||
      file.keyPassword ||
      process.env.FLORAPOINT_KEY_PASSWORD ||
      "",
  };
};

module.exports = (config, options = {}) => {
  const resolved = resolveOptions(options);

  if (!resolved.storePassword || !resolved.keyAlias || !resolved.keyPassword) {
    console.warn(
      "withAndroidSigning: не найдены параметры подписи в " +
        CREDENTIALS_FILE +
        ", release-сборка не будет подписана"
    );
  }

  config = copyKeystore(config);
  config = addProperties(config, resolved);
  config = addSigningConfig(config);
  return config;
};
