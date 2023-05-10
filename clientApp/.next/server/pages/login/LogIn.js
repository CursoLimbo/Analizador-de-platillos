(() => {
var exports = {};
exports.id = 929;
exports.ids = [929];
exports.modules = {

/***/ 20:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "J": () => (/* binding */ AppButton)
});

;// CONCATENATED MODULE: external "@mui/material/colors"
const colors_namespaceObject = require("@mui/material/colors");
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(692);
;// CONCATENATED MODULE: ./src/components/Button.tsx


const AppButton = (0,material_.styled)(material_.Button)(({ theme  })=>({
        color: theme.palette.getContrastText(colors_namespaceObject.teal[500]),
        backgroundColor: colors_namespaceObject.teal[400],
        "&:hover": {
            backgroundColor: colors_namespaceObject.teal[700]
        }
    }));


/***/ }),

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

/***/ 800:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ useLogout),
/* harmony export */   "p": () => (/* binding */ useAuthToken)
/* harmony export */ });
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(487);
/* harmony import */ var _apollo_react_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(515);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_1__);


const TOKEN_NAME = "authToken";
const useAuthToken = ()=>{
    const [cookies, setCookie, removeCookie] = (0,react_cookie__WEBPACK_IMPORTED_MODULE_1__.useCookies)([
        TOKEN_NAME
    ]);
    const setAuthToken = (authToken)=>setCookie(TOKEN_NAME, authToken);
    const removeAuthToken = ()=>removeCookie(TOKEN_NAME);
    return [
        cookies[TOKEN_NAME],
        setAuthToken,
        removeAuthToken
    ];
};
const useLogout = ()=>{
    const [, , removeAuthToken] = useAuthToken();
    const apolloClient = (0,_apollo_react_hooks__WEBPACK_IMPORTED_MODULE_0__.useApolloClient)();
    const logout = async ()=>{
        await apolloClient.clearStore(); // we remove all information in the store
        removeAuthToken();
    };
    return logout;
};


/***/ }),

/***/ 326:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "LogIn": () => (/* binding */ LogIn_LogIn)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./src/pages/login/LogIn.css
var LogIn = __webpack_require__(962);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(692);
// EXTERNAL MODULE: ./src/components/Button.tsx + 1 modules
var Button = __webpack_require__(20);
// EXTERNAL MODULE: external "apollo-boost"
var external_apollo_boost_ = __webpack_require__(414);
// EXTERNAL MODULE: ./src/hooks/auth/useAuthToken.ts
var useAuthToken = __webpack_require__(800);
// EXTERNAL MODULE: external "@apollo/react-hooks"
var react_hooks_ = __webpack_require__(487);
;// CONCATENATED MODULE: ./src/services/useLogInQuery.ts



const logInQuery = external_apollo_boost_.gql`
        query GetManagerByEmailAndPassword($password: String!, $email: String!){
            getManagerByEmailAndPassword(password: $password, email: $email) {
                token,
                id
            }
        }
        `;
const useLogInQuery = (onCompleted, onError)=>{
    const [_, setAuthToken, removeAuthToken] = (0,useAuthToken/* useAuthToken */.p)();
    const [query] = (0,react_hooks_.useLazyQuery)(logInQuery, {
        onCompleted: (data)=>{
            if (data?.getManagerByEmailAndPassword?.token) {
                setAuthToken(data.getManagerByEmailAndPassword.token);
            }
            onCompleted(data);
        },
        onError: (error)=>{
            onError(error.message);
        }
    });
    const login = (password, email)=>{
        removeAuthToken();
        return query({
            variables: {
                password,
                email
            }
        });
    };
    return login;
};

;// CONCATENATED MODULE: external "react-router-dom"
const external_react_router_dom_namespaceObject = require("react-router-dom");
// EXTERNAL MODULE: ./src/context/managerContext.tsx
var managerContext = __webpack_require__(242);
;// CONCATENATED MODULE: ./src/pages/login/LogIn.tsx








const LogIn_LogIn = ()=>{
    const context = (0,external_react_.useContext)(managerContext/* ManagerContext */.t);
    const [email, setEmail] = (0,external_react_.useState)();
    const [password, setPassword] = (0,external_react_.useState)();
    const login = useLogInQuery((data)=>{
        if (context.setId) {
            context.setId(data.getManagerByEmailAndPassword.id);
            console.log("REDIRECTING");
            (0,external_react_router_dom_namespaceObject.redirect)("/");
        }
    }, (error)=>{
        alert(error);
    });
    console.log("Current context", context);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(material_.Stack, {
        direction: "row",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "logInBox",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(material_.Stack, {
                    className: "txt",
                    spacing: 5,
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(material_.TextField, {
                            id: "email",
                            label: "Correo",
                            variant: "outlined",
                            onChange: (event)=>{
                                setEmail(event.target.value);
                            }
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(material_.TextField, {
                            id: "password",
                            label: "Password",
                            type: "password",
                            variant: "outlined",
                            onChange: (event)=>{
                                setPassword(event.target.value);
                            }
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx(Button/* AppButton */.J, {
                            className: "btn-in",
                            variant: "contained",
                            onClick: ()=>{
                                if (password && email) {
                                    login(password, email);
                                }
                            },
                            children: "Entrar"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: "banner"
            })
        ]
    });
};


/***/ }),

/***/ 962:
/***/ (() => {



/***/ }),

/***/ 487:
/***/ ((module) => {

"use strict";
module.exports = require("@apollo/react-hooks");

/***/ }),

/***/ 692:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

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
var __webpack_exports__ = __webpack_require__.X(0, [893], () => (__webpack_exec__(326)));
module.exports = __webpack_exports__;

})();