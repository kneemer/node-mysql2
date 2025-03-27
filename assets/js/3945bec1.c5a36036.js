"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9961],{3410:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>u});const a=JSON.parse('{"id":"documentation/authentication-switch","title":"Authentication Switch Request","description":"During the connection phase the server may ask the client to switch to a different auth method.","source":"@site/docs/documentation/authentication-switch.mdx","sourceDirName":"documentation","slug":"/documentation/authentication-switch","permalink":"/node-mysql2/docs/documentation/authentication-switch","draft":false,"unlisted":false,"editUrl":"https://github.com/sidorares/node-mysql2/tree/master/website/docs/documentation/authentication-switch.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docs","previous":{"title":"Introduction","permalink":"/node-mysql2/docs/documentation"},"next":{"title":"Cloudflare Workers","permalink":"/node-mysql2/docs/documentation/connect-on-cloudflare"}}');var i=t(4848),s=t(8453);const r={},o="Authentication Switch Request",c={},u=[{value:"Multi-factor authentication",id:"multi-factor-authentication",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"authentication-switch-request",children:"Authentication Switch Request"})}),"\n",(0,i.jsxs)(n.p,{children:["During the connection phase the server may ask the client to switch to a different auth method.\nIf the ",(0,i.jsx)(n.code,{children:"authPlugins"})," connection config option is set, it must be an object where each key\nis the name of a potential authentication plugin requested by the server, and the corresponding\nvalue must be a function that optionally receives the connection config options and returns\nanother function, which in turn, optionally receives the switch request data."]}),"\n",(0,i.jsxs)(n.p,{children:["The plugin is loaded with a ",(0,i.jsx)(n.code,{children:"({user,password,...})"})," signature, and each call has a ",(0,i.jsx)(n.code,{children:"(pluginData)"}),"\nsignature. Each call should make the plugin return any additional authentication data (",(0,i.jsx)(n.code,{children:"Buffer"}),")\nthat should be sent back to the server, either synchronously or asynchronously using a ",(0,i.jsx)(n.code,{children:"Promise"}),",\nor should yield an error accordingly."]}),"\n",(0,i.jsxs)(n.p,{children:["Example: (imaginary ",(0,i.jsx)(n.code,{children:"ssh-key-auth"})," plugin) pseudo code"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const conn = mysql.createConnection({\n  user: 'test_user',\n  password: 'test',\n  database: 'test_database',\n  authPlugins: {\n    'ssh-key-auth': function ({ password }) {\n      return function (pluginData) {\n        return getPrivate(key)\n          .then((key) => {\n            const response = encrypt(key, password, pluginData);\n            // continue handshake by sending response data\n            return response;\n          })\n          .catch((err) => {\n            // throw error to propagate error to connect/changeUser handlers\n          });\n      };\n    },\n  },\n});\n"})}),"\n",(0,i.jsxs)(n.p,{children:["There is also a deprecated API where if a ",(0,i.jsx)(n.code,{children:"authSwitchHandler"})," connection config option is set\nit must be a function that receives switch request data and responds via a callback. In this case,\nthe first invocation always has a ",(0,i.jsx)(n.code,{children:"({pluginName, pluginData})"})," signature, following calls - ",(0,i.jsx)(n.code,{children:"({pluginData})"}),".\nThe client replies with an opaque blob matching the requested plugin via ",(0,i.jsx)(n.code,{children:"callback(null, data: Buffer)"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const conn = mysql.createConnection({\n  user: 'test_user',\n  password: 'test',\n  database: 'test_database',\n  authSwitchHandler: function ({ pluginName, pluginData }, cb) {\n    if (pluginName === 'ssh-key-auth') {\n      getPrivateKey((key) => {\n        const response = encrypt(key, pluginData);\n        // continue handshake by sending response data\n        // respond with error to propagate error to connect/changeUser handlers\n        cb(null, response);\n      });\n    } else {\n      const err = new Error(\n        `Unknown AuthSwitchRequest plugin name ${pluginName}`\n      );\n      err.fatal = true;\n      cb(err);\n    }\n  },\n});\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The initial handshake is always performed using ",(0,i.jsx)(n.code,{children:"mysql_native_password"})," plugin. This will be possible to override in future versions."]}),"\n",(0,i.jsxs)(n.p,{children:["Note that if the ",(0,i.jsx)(n.code,{children:"mysql_native_password"})," method is requested it will be handled internally according\nto ",(0,i.jsx)(n.a,{href:"https://dev.mysql.com/doc/internals/en/secure-password-authentication.html#packet-Authentication::Native41",children:"Authentication::Native41"}),"\nand no ",(0,i.jsx)(n.code,{children:"authPlugins"})," function or the ",(0,i.jsx)(n.code,{children:"authSwitchHandler"})," will be invoked."]}),"\n",(0,i.jsx)(n.p,{children:"These MAY be called multiple times if the plugin algorithm requires multiple roundtrips of data\nexchange between client and server."}),"\n",(0,i.jsx)(n.h2,{id:"multi-factor-authentication",children:"Multi-factor authentication"}),"\n",(0,i.jsxs)(n.p,{children:["If the user requires multi-factor authentication in the server, the client will receive a ",(0,i.jsx)(n.code,{children:"AuthNextFactor"}),"\nrequest, which is similar in structure to the regular authentication switch request and contains the name\nand possible initial data for the additional authentication factor plugin (up to 3). Additional passwords\ncan be provided using the connection config options - ",(0,i.jsx)(n.code,{children:"password2"})," and ",(0,i.jsx)(n.code,{children:"password3"}),". Again, for each\nauthentication factor, multiple roundtrips of data exchange can be required by the plugin algoritm."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"const conn = mysql.createConnection({\n  user: 'test_user',\n  password: 'secret1',\n  password2: 'secret2',\n  password3: 'secret3',\n  database: 'test_database',\n  authPlugins: {\n    // password1 === password\n    'auth-plugin1': function ({ password1 }) {\n      return function (serverPluginData) {\n        return clientPluginData(password1, serverPluginData);\n      };\n    },\n    'auth-plugin2': function ({ password2 }) {\n      return function (serverPluginData) {\n        return clientPluginData(password2, serverPluginData);\n      };\n    },\n    'auth-plugin3': function ({ password3 }) {\n      return function (serverPluginData) {\n        return clientPluginData(password3, serverPluginData);\n      };\n    },\n  },\n});\n"})})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var a=t(6540);const i={},s=a.createContext(i);function r(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);