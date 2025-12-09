//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"b0f34d51fccc69fd334253924abd8d6853fad7aa",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "Fun.Blazor.Docs.Wasm",
  "resources": {
    "hash": "sha256-VeilFVuBKHSeC3vnFgIFNhgDyJA7yUTjU1IZdVFzaMY=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.xanz2e7ksm.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.o0qy896u8v.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.2qba9g5fwn.wasm",
        "integrity": "sha256-Jq16DJlsNP/EZy3u5dUfhPu0r4vqciQE3d0LSaelSes="
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.dll",
        "name": "System.Runtime.InteropServices.JavaScript.hth4ac85mk.dll",
        "integrity": "sha256-Ne2otpgQlppXQJF5LD34r8MRxejcsWpcfNELWrRuXD4="
      },
      {
        "virtualPath": "System.Private.CoreLib.dll",
        "name": "System.Private.CoreLib.ifgi8n9ees.dll",
        "integrity": "sha256-rvert6fzIMh6wXLIpcztQfaLD0lJ7GF1NvMZUd809cc="
      }
    ],
    "assembly": [
      {
        "virtualPath": "Elmish.dll",
        "name": "Elmish.m6bp4f26is.dll",
        "integrity": "sha256-IjvSzrPvOUakfCEi9bvBQrC3Q3kuRP1FYziM5SVzgUM="
      },
      {
        "virtualPath": "FSharp.Control.Reactive.dll",
        "name": "FSharp.Control.Reactive.m5x4cv5xj6.dll",
        "integrity": "sha256-2nhNpVMjfMwf5maQCEt8MUeqC8OgX+nnU8Akn47TAM0="
      },
      {
        "virtualPath": "FSharp.Core.dll",
        "name": "FSharp.Core.iwx61mm3fj.dll",
        "integrity": "sha256-IsrZE5kvKmUHs0HJhNlhLT/VefB9RU5JM7Cn3pXThmg="
      },
      {
        "virtualPath": "FSharp.Data.dll",
        "name": "FSharp.Data.b6w4w9bvf4.dll",
        "integrity": "sha256-48814ueyUidVyHK731AQv3pOEsW5kfbw9G555mf6KlI="
      },
      {
        "virtualPath": "FSharp.Data.Adaptive.dll",
        "name": "FSharp.Data.Adaptive.5osfj3afnn.dll",
        "integrity": "sha256-5X2hp0XXBShuWcMbvKQBALfOACJWrMnpUJnk0sFPn3c="
      },
      {
        "virtualPath": "FSharp.Data.Csv.Core.dll",
        "name": "FSharp.Data.Csv.Core.t17lb33j31.dll",
        "integrity": "sha256-8d0LU1+E2I0OSjl32hm+mQPaMtMFgLRMArGsUQjAVI0="
      },
      {
        "virtualPath": "FSharp.Data.Html.Core.dll",
        "name": "FSharp.Data.Html.Core.0w7aygcyn8.dll",
        "integrity": "sha256-cCgZwQI4bkVugv5UjW32EGLYr1F0evzDizKpSxsPCbo="
      },
      {
        "virtualPath": "FSharp.Data.Http.dll",
        "name": "FSharp.Data.Http.0ja7qosouv.dll",
        "integrity": "sha256-DKt0ldXGkK8ZgOOxM1CUK1j/igl+vm8EbwU6bBxyObE="
      },
      {
        "virtualPath": "FSharp.Data.Json.Core.dll",
        "name": "FSharp.Data.Json.Core.veezdd3ndm.dll",
        "integrity": "sha256-t6SKcRqdabs7uLTctefZXeN4ZmspykU+XLswtSgblWc="
      },
      {
        "virtualPath": "FSharp.Data.Runtime.Utilities.dll",
        "name": "FSharp.Data.Runtime.Utilities.nls1xm60pt.dll",
        "integrity": "sha256-C4BAtP3vkClM+Z6r4AttcExuYSc137W84KOpPWJIS+0="
      },
      {
        "virtualPath": "FSharp.Data.WorldBank.Core.dll",
        "name": "FSharp.Data.WorldBank.Core.mm9p6qicsi.dll",
        "integrity": "sha256-/oqugSBaaht0JiVkRM5P+gLz2vesdsc2TUJSacCR2FQ="
      },
      {
        "virtualPath": "FSharp.Data.Xml.Core.dll",
        "name": "FSharp.Data.Xml.Core.i0tu9qfcuh.dll",
        "integrity": "sha256-ntBPvaAOTvi1N8ioCT1k1CyTvLxuQ1olj6Ez+ttDXP4="
      },
      {
        "virtualPath": "FSharp.SystemTextJson.dll",
        "name": "FSharp.SystemTextJson.ls7208qoei.dll",
        "integrity": "sha256-C6xVIS9Ch4rQ2eDgXfW0Apnw2HDNgspBaV8+d9myZxE="
      },
      {
        "virtualPath": "Fun.Css.dll",
        "name": "Fun.Css.ktfd5pynmq.dll",
        "integrity": "sha256-WJpJl4qGp4k9l7FE7FTyi5YnRER0CCCGLT9GIS1Rxhc="
      },
      {
        "virtualPath": "Fun.Result.dll",
        "name": "Fun.Result.yn6gf74kwq.dll",
        "integrity": "sha256-Qk+owXcDRyC7xlOcTVc/J2vkYY6FilqA6vnx08lw6+Q="
      },
      {
        "virtualPath": "Majorsoft.Blazor.WebAssembly.Logging.Console.dll",
        "name": "Majorsoft.Blazor.WebAssembly.Logging.Console.6oq7hie8qq.dll",
        "integrity": "sha256-OmRQfuZ4TAuOFMUy03G4q/yYql1/ZA1PcqQyWS6F5rU="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.dll",
        "name": "Microsoft.AspNetCore.Components.599h6vamcg.dll",
        "integrity": "sha256-5/TT0QGnujaUaa+jp8qkqzXVbY7Gi3jRuiNZh3SHVW0="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.dll",
        "name": "Microsoft.AspNetCore.Components.Forms.b3rd9v21f9.dll",
        "integrity": "sha256-Z68ZVwME6wM2JFJn4mlzJpdkjixwQDvFlkMxFTFKeec="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.dll",
        "name": "Microsoft.AspNetCore.Components.Web.xzq80ewa17.dll",
        "integrity": "sha256-rbIYgatyjKASDQEyMsV7iAffETWmyT9FFSoqqi6iaL8="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.dll",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.3cqy1zux46.dll",
        "integrity": "sha256-LRlDZNbQ0YmyTb5V3wPP0U2uqL/QZKV5V7fSEIs9Y7A="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.WebUtilities.dll",
        "name": "Microsoft.AspNetCore.WebUtilities.f5z2gdcqhw.dll",
        "integrity": "sha256-jT2huM3efcGt3+NCdmZLZaTQJ1ABBGT/d0qKmnJLgSY="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.dll",
        "name": "Microsoft.Extensions.Configuration.a7cqb811ax.dll",
        "integrity": "sha256-RhvNF3ceSH4xO/gAE31V8YYoBplwoKuppeVDoBQ2ADo="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.dll",
        "name": "Microsoft.Extensions.Configuration.Abstractions.4laejdwpf5.dll",
        "integrity": "sha256-6EuLaiHwo125319gSNVSjO8wTsCUuTeWhDNTsKpt5t4="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.dll",
        "name": "Microsoft.Extensions.Configuration.Json.jiib2jr2lw.dll",
        "integrity": "sha256-e9DduyiDn2YYq+yYToKkOsDwTMDW3qYFp2BfnLPzvkc="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.dll",
        "name": "Microsoft.Extensions.DependencyInjection.scn6ebcuo2.dll",
        "integrity": "sha256-vNUg+rgkk+YC7bRN1HNW9imB2+sloAvQjvohTyOBE+k="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.dll",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.n0ajpzl66o.dll",
        "integrity": "sha256-d676i3rje/F31mMlZwZT1CrhSUNMB3FQ+Uh/+2X81pQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.dll",
        "name": "Microsoft.Extensions.Localization.cbjuwc84ih.dll",
        "integrity": "sha256-SA3Rme3Bpo0Zh/dT0KU8JahFroGxFHPuTqST+hGC+Zo="
      },
      {
        "virtualPath": "Microsoft.Extensions.Localization.Abstractions.dll",
        "name": "Microsoft.Extensions.Localization.Abstractions.r0omz7iifc.dll",
        "integrity": "sha256-5b3FiXvUf6/rn74VM0X05P0M9AlHAc1Sewva/sdBcD8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.dll",
        "name": "Microsoft.Extensions.Logging.63z3r992km.dll",
        "integrity": "sha256-YqPm94gya7gAPIfPJTophQOJA9S2vTQPp6/YX2SN3KM="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.dll",
        "name": "Microsoft.Extensions.Logging.Abstractions.c1l1puyg6w.dll",
        "integrity": "sha256-wDHb5y1GBzMnbBxx/nEc6CCqnYgGSL0gFpmBXsw/MAQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.dll",
        "name": "Microsoft.Extensions.ObjectPool.eckchuj08b.dll",
        "integrity": "sha256-AvVh/0Lnykj7b1kFBKOdCi7RoDUxLMKQi6l9IHyHFjw="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.dll",
        "name": "Microsoft.Extensions.Options.9q4lkbtilx.dll",
        "integrity": "sha256-MfsiXn5rv8MkQtM5OfPE+NoDOXQMRCqLm+JCfoYcO+0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.dll",
        "name": "Microsoft.Extensions.Primitives.wr8mikjxqj.dll",
        "integrity": "sha256-FJhTFVora7OirZO+y+qu9OKzDxNYBUyn4dunhX3GGWg="
      },
      {
        "virtualPath": "Microsoft.JSInterop.dll",
        "name": "Microsoft.JSInterop.rapgy2d87d.dll",
        "integrity": "sha256-7aF2oT4zP4Xg/GlsCXDam25bu7phsRjYlWxHDYXj5wk="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.dll",
        "name": "Microsoft.JSInterop.WebAssembly.4tnlozjtat.dll",
        "integrity": "sha256-yF/0FTfKhT1Y3QTdfMX6hBtYqSaaL0C2FSDkdWpMorI="
      },
      {
        "virtualPath": "MudBlazor.dll",
        "name": "MudBlazor.9a0onxc50t.dll",
        "integrity": "sha256-j00yJcJwdHG2NIi88BuGJv/psQoyX24fruLHg5daD64="
      },
      {
        "virtualPath": "System.Reactive.dll",
        "name": "System.Reactive.d6nagwfq4o.dll",
        "integrity": "sha256-K2wx37H8YBmkKgB+0OXgBXTebqDEf+0MooK/O7J3Gww="
      },
      {
        "virtualPath": "System.Collections.Concurrent.dll",
        "name": "System.Collections.Concurrent.4tt568epvu.dll",
        "integrity": "sha256-2NMud5nHev/Fa9BxVgT/wNqMBuiENp4KTWyUOSgJptc="
      },
      {
        "virtualPath": "System.Collections.Immutable.dll",
        "name": "System.Collections.Immutable.k7nk67239y.dll",
        "integrity": "sha256-gNRsgQl22SsZcHBVmLk4HtAgqaDpvqZcvWMwyP1HIpg="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.dll",
        "name": "System.Collections.NonGeneric.ytqe1yc0bj.dll",
        "integrity": "sha256-VqhpxfdtWA9+g8Oj8GjgKURMXVm1pBMXVQil0YOVXjU="
      },
      {
        "virtualPath": "System.Collections.Specialized.dll",
        "name": "System.Collections.Specialized.uyhknk36ab.dll",
        "integrity": "sha256-9o5JwBalIz4jrJzUpeH9vPjDSnQ3eD6SL38zJdlekGc="
      },
      {
        "virtualPath": "System.Collections.dll",
        "name": "System.Collections.9oteov3wvb.dll",
        "integrity": "sha256-R07E+SWgNMCOVZuNvs48TvK3Ss/5dwVkMg8Mb/iClnI="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.dll",
        "name": "System.ComponentModel.Annotations.lxeqo6ackn.dll",
        "integrity": "sha256-GV7rkDtd6jNtNlX2c5ayHuT+0p7TA1P3asmVUHOtCTw="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.dll",
        "name": "System.ComponentModel.EventBasedAsync.ycimpwet15.dll",
        "integrity": "sha256-cl/KWh/YDu81bIkGQ6ghb0rSusg6wE0m5moEt8XqMJM="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.dll",
        "name": "System.ComponentModel.Primitives.ul4t2oql4g.dll",
        "integrity": "sha256-bsEBYeUwTJW7L0iyoNsu7eJ48z5HolqI4j/KovJfVj0="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.dll",
        "name": "System.ComponentModel.TypeConverter.fdnui7pecz.dll",
        "integrity": "sha256-06/1PEVxh/RHqzwBZ+/AYakSIqrnxaf11tHN8YI97Dw="
      },
      {
        "virtualPath": "System.ComponentModel.dll",
        "name": "System.ComponentModel.6zaj72w3pt.dll",
        "integrity": "sha256-Ui2wu0SmtLA5KSX7wctt2UXb9uSre7oe6VnHZW40Ehg="
      },
      {
        "virtualPath": "System.Console.dll",
        "name": "System.Console.jwbu0uyoyr.dll",
        "integrity": "sha256-PRDXPU2bGLLsshHc2H7rdAjxueZvC1D9sXiozRxgFpY="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.dll",
        "name": "System.Diagnostics.DiagnosticSource.cu1omvwttz.dll",
        "integrity": "sha256-rO44hJWc8sGOrmyd+ghLXh0rR9cz2RR89dPjIhphASM="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.dll",
        "name": "System.Diagnostics.TraceSource.jgms5itnsl.dll",
        "integrity": "sha256-s51gb0M5rh1wn81YULy661N3O623tgvyfzd7zaNUbME="
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.dll",
        "name": "System.IO.FileSystem.Watcher.k0rixy7pwl.dll",
        "integrity": "sha256-vG0Zij38FRiWZHiTp8LxzmesctmTlN/vCwAYU1LuH7g="
      },
      {
        "virtualPath": "System.IO.Pipelines.dll",
        "name": "System.IO.Pipelines.28672gaohx.dll",
        "integrity": "sha256-Qj3UhOXkphdPnzv8RgizgQAiA5miXFCj9MiWocDePnc="
      },
      {
        "virtualPath": "System.Linq.Expressions.dll",
        "name": "System.Linq.Expressions.hrp6z6djkj.dll",
        "integrity": "sha256-E81H4eD0xrW9UzAkdFQTmkgUKO09JJ9W9StwkxXLr0o="
      },
      {
        "virtualPath": "System.Linq.Queryable.dll",
        "name": "System.Linq.Queryable.2rb0a14t6n.dll",
        "integrity": "sha256-glaJGcYF36ikUBonYsqfyZH8Y8cAOF1qYgq7V1Qh/E4="
      },
      {
        "virtualPath": "System.Linq.dll",
        "name": "System.Linq.lmwocwrf2q.dll",
        "integrity": "sha256-LTewanrXvfIjswcOYAovhCBC77b7ppKFzeUJq3iLD1Q="
      },
      {
        "virtualPath": "System.Memory.dll",
        "name": "System.Memory.zvj7akgytm.dll",
        "integrity": "sha256-b/pE4ijxm2tzShmkisPbpwHmrkKh12hkqPM/tgBh2og="
      },
      {
        "virtualPath": "System.Net.Http.dll",
        "name": "System.Net.Http.kb6w6eceg1.dll",
        "integrity": "sha256-AOZVx5y185cLn15tHzYrQtPJh3kC1qzQpJ4sNDHauTI="
      },
      {
        "virtualPath": "System.Net.Primitives.dll",
        "name": "System.Net.Primitives.bw0w5l2y6x.dll",
        "integrity": "sha256-iwVTJPLtrEh1U5zHJQe53uG6Tu4S3GhXPT18uTUtLpY="
      },
      {
        "virtualPath": "System.Net.Requests.dll",
        "name": "System.Net.Requests.a0g89ii53p.dll",
        "integrity": "sha256-9muGKXMFGIPWXfrH+iA9xDN3sJLnEtrolPkrCjdtLdA="
      },
      {
        "virtualPath": "System.Net.WebClient.dll",
        "name": "System.Net.WebClient.p6ucuc2w91.dll",
        "integrity": "sha256-0dHscOLdwYcOabD8zsZ+vNErriI5Ib6nMVl8iTCNzqw="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.dll",
        "name": "System.Net.WebHeaderCollection.fyycvnby45.dll",
        "integrity": "sha256-96YqveO/y/4yppEb0EvBkgBfV3gExhb9qQM3ye3rEXE="
      },
      {
        "virtualPath": "System.ObjectModel.dll",
        "name": "System.ObjectModel.8h7w5c07lc.dll",
        "integrity": "sha256-3IJP4KDZ/R4/9GnZ+GAw61hBOxVt957WXbKbdjFaamY="
      },
      {
        "virtualPath": "System.Private.Uri.dll",
        "name": "System.Private.Uri.px7r58zdrr.dll",
        "integrity": "sha256-7RVYSOqwneV3oTfcEMZ3/ZJGEPotRNOXvkynmsT5H+8="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.dll",
        "name": "System.Private.Xml.Linq.1wrdvpmtdc.dll",
        "integrity": "sha256-jw785t68rKTxoMt4EGDSv3aBeTiEW6IcCkn1jjlgSaU="
      },
      {
        "virtualPath": "System.Private.Xml.dll",
        "name": "System.Private.Xml.3onzx4xal4.dll",
        "integrity": "sha256-bby5AFV6UL77P3s5+aZntjolhMsfXz9Om08B7rZuFrE="
      },
      {
        "virtualPath": "System.Runtime.Numerics.dll",
        "name": "System.Runtime.Numerics.ve1c7ylbgk.dll",
        "integrity": "sha256-J9F+jeRScXlDp/8ktLtbgSmD8i6ij98ZUpQ7BcK6n0A="
      },
      {
        "virtualPath": "System.Runtime.dll",
        "name": "System.Runtime.qhj77wkf8a.dll",
        "integrity": "sha256-krovdVZy+SXQRHPboM5OPx3lz8rMYLNHgodvsitUUxo="
      },
      {
        "virtualPath": "System.Security.Cryptography.dll",
        "name": "System.Security.Cryptography.r1ot29fepe.dll",
        "integrity": "sha256-/5QSZbrIwlFfm/YGesWwav7MFyogpvZOsUcIfiZMYsc="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.dll",
        "name": "System.Text.Encodings.Web.k7e34z6ppd.dll",
        "integrity": "sha256-sPoI/MiJELUhankTWHFoJszJ6i5vWdVDSW+YuoZZ/6g="
      },
      {
        "virtualPath": "System.Text.Json.dll",
        "name": "System.Text.Json.e5eao30fx7.dll",
        "integrity": "sha256-IiqRJ+jPAtAR3rOH58m/6R936H7F7Lagf785Ex3JKU4="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.dll",
        "name": "System.Text.RegularExpressions.1gifwrcasj.dll",
        "integrity": "sha256-30gGw3J13YW2jv6iXTC1sddtYyFUl+UTNvB+oP2F5z8="
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.dll",
        "name": "System.Threading.Tasks.Parallel.ap84f9pphr.dll",
        "integrity": "sha256-Dghd0VKXZTg0X/nlGJxVv46hpcnyz7z5JG9FFBUqiGQ="
      },
      {
        "virtualPath": "System.Threading.Thread.dll",
        "name": "System.Threading.Thread.24sakklnyo.dll",
        "integrity": "sha256-Lt/cuGuDFGW2QeaaUVNfFHANTJPjwggGl4Up1ieTU0Q="
      },
      {
        "virtualPath": "System.Threading.ThreadPool.dll",
        "name": "System.Threading.ThreadPool.8qja8377hb.dll",
        "integrity": "sha256-oFkh1poP9L6sZRsP1bY4ElHAhJnJoE5fYoYmfnjAl1A="
      },
      {
        "virtualPath": "System.Threading.dll",
        "name": "System.Threading.bwpfaaz31w.dll",
        "integrity": "sha256-JS1vioI7c9eCFo+csaItS0IizGmzZcySRA6c1m0hkh0="
      },
      {
        "virtualPath": "System.Xml.Linq.dll",
        "name": "System.Xml.Linq.hagosawx32.dll",
        "integrity": "sha256-eawcYqvELnB+gLQC6s/gNzwxMeQ6uL7UgPCqhJ5yArE="
      },
      {
        "virtualPath": "System.dll",
        "name": "System.esfy0y9znr.dll",
        "integrity": "sha256-bpzfYuklLpFtM84nDcle4mTYMS2k2Yz8G0A/qSG+e98="
      },
      {
        "virtualPath": "netstandard.dll",
        "name": "netstandard.r06bv6k7z1.dll",
        "integrity": "sha256-xbVFVC3N97KR4mDSkfv12NR+J1YrCIh+TM/Un06X3v0="
      },
      {
        "virtualPath": "Fun.Blazor.CustomElements.dll",
        "name": "Fun.Blazor.CustomElements.g2oup29nrj.dll",
        "integrity": "sha256-WCYSiYLrjFkjjsaQvGhBpnJsycPaWbBVV/3Dt3iexps="
      },
      {
        "virtualPath": "Fun.Blazor.dll",
        "name": "Fun.Blazor.v96peygefz.dll",
        "integrity": "sha256-AwKWmtIWqcIJLF0TfF6bv1aa9BxbwNm1JIanjr7lSws="
      },
      {
        "virtualPath": "Fun.Blazor.Elmish.dll",
        "name": "Fun.Blazor.Elmish.m72sbz5qqk.dll",
        "integrity": "sha256-zt6FKboGeyj/vWlxnN+Vshb3pyGSBnzJslFWrQ4UKms="
      },
      {
        "virtualPath": "Fun.Blazor.HtmlTemplate.dll",
        "name": "Fun.Blazor.HtmlTemplate.81bvj1hri6.dll",
        "integrity": "sha256-ZE9dtPexZWfFl/xGnZ1p4XgITokADKbAfw1pRi7h048="
      },
      {
        "virtualPath": "Fun.Blazor.Microsoft.Web.dll",
        "name": "Fun.Blazor.Microsoft.Web.25qxpss6k3.dll",
        "integrity": "sha256-ahRSC4iFMMe27MdvP8e+QvvjQXMYk3b9U3A5TdNIAYQ="
      },
      {
        "virtualPath": "Fun.Blazor.MudBlazor.dll",
        "name": "Fun.Blazor.MudBlazor.ttet0k4df4.dll",
        "integrity": "sha256-UUDeswyP0KZJijFQhMDVCPMYeoG2FdSWc9HAC/tk5pg="
      },
      {
        "virtualPath": "Fun.Blazor.Reactive.dll",
        "name": "Fun.Blazor.Reactive.b9mbk8yc6j.dll",
        "integrity": "sha256-bxmr0aFXkfVm9tfke3rF2P0UDEJwRUuv3UzGfp/rOcE="
      },
      {
        "virtualPath": "Fun.Blazor.Docs.Wasm.dll",
        "name": "Fun.Blazor.Docs.Wasm.hov3bi155w.dll",
        "integrity": "sha256-33lYXQ1XkZ/n9sIgKvlat4Ork/NrhcDW+0r7vTIBx+M="
      }
    ],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.t27bxzak0e.dll",
          "integrity": "sha256-azqaMrxvtHvJ0EojQ0ML6rZI/CAnn0KUyKrmC4aJdm8="
        }
      ],
      "de": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.5kt2rkzium.dll",
          "integrity": "sha256-24Iv5DNjSpaQgxulrdRMm5xpbn+ixrsnw9Qhez00vPY="
        }
      ],
      "es": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.s0g0saskzw.dll",
          "integrity": "sha256-HBW+Qgvhb/xmkykDVlSBpdiQ7yD67AU29GTelsFgmjg="
        }
      ],
      "fr": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.0tjfrx8it5.dll",
          "integrity": "sha256-/M4Xl7K2Ep3x+d8ZkLeBpQWEeMdtfLvF4iPN34pQ6F4="
        }
      ],
      "it": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.ltvb81ixt2.dll",
          "integrity": "sha256-2YHaBex5gjRiGoZUtFIhi2K8QzfdWvnrlJpqzyIBmEI="
        }
      ],
      "ja": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.924m7q3uw2.dll",
          "integrity": "sha256-74I3H7WdfVrlCmKZzYq2E3Z+Bh9HKFwLIpjQiMn54vw="
        }
      ],
      "ko": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.rjbazlwmjn.dll",
          "integrity": "sha256-90+SWeh60YxB3/63dLwizvoNggC/3+cyLoYVGExtodk="
        }
      ],
      "pl": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.qgsku7qi5z.dll",
          "integrity": "sha256-5rgcxNhtqon9TF3U3PY187Cej/+VBq17RmhxlOZemY4="
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.2xbzdj1vyb.dll",
          "integrity": "sha256-FlD3cDZ2qoln4K1nxsjKQFO+ykJEQC9WicTgE7h06/0="
        }
      ],
      "ru": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.ho4ah3mkhf.dll",
          "integrity": "sha256-MTMAY8OhiCdGtKkxcMY30hNLlEvH9o+A5RsPacis7A4="
        }
      ],
      "tr": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.9hglh82d98.dll",
          "integrity": "sha256-U4h3Z1cJAZfj30l3fy5dkiZTilY08a7rziQTa29Tcd4="
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.fs8iwc4z0u.dll",
          "integrity": "sha256-/8znx3+z9g1ec95XDMzt6hs19AFzVXu7YYjZa7IUuMI="
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "FSharp.Core.resources.dll",
          "name": "FSharp.Core.resources.ahd50lkif8.dll",
          "integrity": "sha256-fgewrwKUMFYEBgl+iK2VNXXHz0kPUpSlsAkGGzUaEdc="
        }
      ]
    },
    "libraryInitializers": [
      {
        "name": "_content/Microsoft.AspNetCore.Components.CustomElements/Microsoft.AspNetCore.Components.CustomElements.lib.module.js"
      },
      {
        "name": "BlazorWasmPreRendering.Build.lfyg69o9wu.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../BlazorWasmPreRendering.Build.lfyg69o9wu.lib.module.js"
      }
    ],
    "modulesAfterRuntimeReady": [
      {
        "name": "../_content/Microsoft.AspNetCore.Components.CustomElements/Microsoft.AspNetCore.Components.CustomElements.lib.module.js"
      }
    ]
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
