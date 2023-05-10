(() => {
var exports = {};
exports.id = 532;
exports.ids = [532];
exports.modules = {

/***/ 242:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ ManagerContext)
/* harmony export */ });
/* unused harmony export ManagerContextProvider */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const ManagerContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1___default().createContext({});
const ManagerContextProvider = ({ children  })=>{
    const [managerId, setManagerId] = useState();
    return /*#__PURE__*/ _jsx(ManagerContext.Provider, {
        value: {
            id: managerId,
            setId: (id)=>{
                console.log("Cambio", id);
                setManagerId(id);
            }
        },
        children: children
    });
};


/***/ }),

/***/ 616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Profile": () => (/* binding */ Profile_Profile)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./src/components/NavBar.tsx
var NavBar = __webpack_require__(143);
// EXTERNAL MODULE: ./src/pages/profile/Profile.css
var Profile = __webpack_require__(92);
;// CONCATENATED MODULE: ./src/assets/img/logoProfile.jpg
/* harmony default export */ const logoProfile = ({"src":"/_next/static/media/logoProfile.e6d4ad2e.jpg","height":566,"width":1080,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAQACAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABwEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAKsGP//EABoQAAICAwAAAAAAAAAAAAAAAAECAAMxMkH/2gAIAQEAAT8AqJstVmO2Ryf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAXEQADAQAAAAAAAAAAAAAAAAAAAkFx/9oACAEDAQE/AFun/9k=","blurWidth":8,"blurHeight":4});
// EXTERNAL MODULE: external "apollo-boost"
var external_apollo_boost_ = __webpack_require__(414);
// EXTERNAL MODULE: external "@apollo/react-hooks"
var react_hooks_ = __webpack_require__(487);
;// CONCATENATED MODULE: ./src/services/Manager-Service.ts


const getManagerById = external_apollo_boost_.gql`
        query GetManager($getManagerId: String!) {
                  getManager(id: $getManagerId) {
                    name, 
                    email,
                    phone,
                    whatsapp,
                    bankAccounts,
                    password
                  }
        }`;
const useGetManagerQuery = (id)=>{
    const { data  } = (0,react_hooks_.useQuery)(getManagerById);
    const getManager = ()=>{
        console.log(data);
        return data({
            variables: {
                id: id
            }
        });
    };
    return getManager;
};

// EXTERNAL MODULE: ./src/context/managerContext.tsx
var managerContext = __webpack_require__(242);
;// CONCATENATED MODULE: ./src/pages/profile/Profile.tsx







const Profile_Profile = ()=>{
    const context = (0,external_react_.useContext)(managerContext/* ManagerContext */.t);
    console.log("Current context", context);
    const getManager = useGetManagerQuery(context.id);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(NavBar/* NavBar */.l, {
                isHome: false
            }),
            /*#__PURE__*/ jsx_runtime.jsx("img", {
                className: "imgLogo",
                src: `${logoProfile}?w=330&h=330&fit=crop&auto=format`,
                srcSet: `${logoProfile}?w=330&h=330&fit=crop&auto=format&dpr=2 2x`,
                width: "60%",
                height: "350px"
            })
        ]
    });
};


/***/ }),

/***/ 92:
/***/ (() => {



/***/ }),

/***/ 487:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/react-hooks");

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/ArrowBack");

/***/ }),

/***/ 365:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Menu");

/***/ }),

/***/ 882:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/AppBar");

/***/ }),

/***/ 120:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Avatar");

/***/ }),

/***/ 19:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Box");

/***/ }),

/***/ 934:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/IconButton");

/***/ }),

/***/ 125:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Menu");

/***/ }),

/***/ 271:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/MenuItem");

/***/ }),

/***/ 431:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Toolbar");

/***/ }),

/***/ 229:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Tooltip");

/***/ }),

/***/ 163:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Typography");

/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
module.exports = require("apollo-boost");

/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 515:
/***/ ((module) => {

"use strict";
module.exports = require("react-cookie");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [893,143], () => (__webpack_exec__(616)));
module.exports = __webpack_exports__;

})();