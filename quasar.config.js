/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const {configure} = require("quasar/wrappers");
const path = require("path");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')

module.exports = configure(function (ctx) {
  return {
    // supportTS: true,
    eslint: {
      // fix: true,
      // include: [],
      // exclude: [],
      // rawOptions: {},
      warnings: true,
      errors: true,
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: ["element_use", "i18n"],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ["app.scss"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      sourcemap: false,

      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node21",
      },

      extendViteConf(viteConf, {isServer, isClient}) {
        // 编辑 viteConf 即可修改 Vite 配置
        viteConf.build.chunkSizeWarningLimit = 2000;
        viteConf.rollupOptions = {
          output: {
            manualChunks(id) {
              if (id.includes("node_modules")) {
                return id
                  .toString()
                  .split("node_modules/.pnpm/")[1]
                  .split("/")[0]
                  .toString();
              }
            },
          },
        };
      },

      vueRouterMode: "hash", // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      viteVuePluginOptions: {
        template: {
          compilerOptions: {
            // 将所有带xxx的标签名都视为自定义元素
            // isCustomElement: (tag) => tag.includes('webview')
          },
        },
        ViteCompressionPlugin: {
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        },
      },

      vitePlugins: [
        [AutoImport, {
          resolvers: [ElementPlusResolver()]
        }
        ],
        [Components, {
          resolvers: [ElementPlusResolver()]
        }
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      open: false, // opens browser window automatically
      port: 21555,
      vueDevtools: true,
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {},
      lang: 'zh-CN', //使用中文简体语言包
      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins

      plugins: [],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    sourceFiles: {
      //   rootComponent: 'src/App.vue',
      //   router: 'src/router/index',
      //   store: 'src/store/index',
      //   registerServiceWorker: 'src-pwa/register-service-worker',
      //   serviceWorker: 'src-pwa/custom-service-worker',
      //   electronMain: 'src-electron/electron-main',
      //   electronPreload: 'src-electron/electron-preload',
    },

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        "render", // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: "generateSW", // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      extendElectronMainConf(cfg) {

      },

      extendElectronPreloadConf(cfg) {
      },

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: "builder", // 'packager' or 'builder'

      builder: {
        // files: [
        //   "**/*",
        //   "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
        //   "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
        //   "!**/node_modules/*.d.ts",
        //   "!**/node_modules/.bin",
        //   "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
        //   "!.editorconfig",
        //   "!**/._*",
        //   "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
        //   "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
        //   "!**/{appveyor.yml,.travis.yml,circle.yml}",
        //   "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}"
        // ],

        asar: true,
        // https://www.electron.build/configuration/configuration
        extraFiles: [
          {
            from: "./bag_manage",
            to: "./bag_manage",
          },
          // {
          //   from: "./proData_save/language",
          //   to: "./proData_save/language",
          // },
        ],
        productName: "抽卡模拟",

        // normal “store” | “normal” | “maximum” | “undefined”
        // 如果您想快速测试构建，store 可以显着缩短构建时间。maximum不会导致明显的尺寸差异，但会增加构建时间
        compression: "store",

        // compression: "maximum",
        // extraResources: {
        //   from: './ck_manage',
        //   to: './ck_manage'
        // },

        appId: "quasar-project",
        win: {
          // icon: "build/icons/icon.ico",
          target: [
            {
              target: "nsis",
            },
          ],
        },

        // 自定义打包路径需要配置nsis
        nsis: {
          // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          allowElevation: true,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          oneClick: false,
          //辅助安装，（选择按机器还是按用户）。true时代表始终按用户安装。
          perMachine: true,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          // 如果oneClick是false并且perMachine是true：无安装模式安装程序页面，始终按机器安装。
          allowToChangeInstallationDirectory: true,
          // 安装图标
          // installerIcon: './public/img/logo.ico',
          // 卸载图标
          // uninstallerIcon: './public/img/logo.ico',
          // 安装时头部图标
          // installerHeaderIcon: './public/img/logo.ico',
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true,
          // 快捷方式的名称,默认为应用程序名称
          // shortcutName: 'HX',
          // 配置 nsn 如修改默认安装目录
          include: "./src/program_set/installer.nsh",
          // electron中LICENSE.txt所需要的格式，并非是GBK，或者UTF-8，LICENSE.txt写好之后，需要进行转化，转化为ANSI
          license: './src/program_set/LICENSE.txt'
        },
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ["my-content-script"],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  };
});
