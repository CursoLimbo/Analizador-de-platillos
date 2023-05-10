"use strict";
exports.id = 143;
exports.ids = [143];
exports.modules = {

/***/ 143:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ NavBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(882);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(431);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(622);
/* harmony import */ var _mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(365);
/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(229);
/* harmony import */ var _mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(120);
/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(125);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Menu__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(271);
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _hooks_auth_useAuthToken__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(800);














const settings = [
    "Profile",
    "Settings",
    "Log Out"
];
const NavBar = (props)=>{
    const { isHome  } = props;
    const [anchorElUser, setAnchorElUser] = react__WEBPACK_IMPORTED_MODULE_1__.useState(null);
    const logOut = (0,_hooks_auth_useAuthToken__WEBPACK_IMPORTED_MODULE_13__/* .useLogout */ .a)();
    const handleOpenUserMenu = (event)=>{
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = ()=>{
        setAnchorElUser(null);
    };
    const handleGoBack = ()=>{
        window.history.back();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_3___default()), {
        sx: {
            flexGrow: 1
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_2___default()), {
            position: "static",
            sx: {
                backgroundColor: "teal"
            },
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_4___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                        size: "large",
                        edge: "start",
                        color: "inherit",
                        "aria-label": "go-back",
                        sx: {
                            mr: 2
                        },
                        onClick: ()=>{
                            if (isHome) {
                                logOut().then();
                            } else {
                                handleGoBack();
                                console.log("back");
                            }
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_7___default()), {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                        size: "large",
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        sx: {
                            mr: 2
                        },
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_8___default()), {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                        variant: "h6",
                        component: "div",
                        sx: {
                            flexGrow: 2,
                            textAlign: "center"
                        },
                        children: "News"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_3___default()), {
                        sx: {
                            flexGrow: 0
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Tooltip__WEBPACK_IMPORTED_MODULE_9___default()), {
                                title: "Open settings",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                                    onClick: handleOpenUserMenu,
                                    sx: {
                                        p: 0
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        alt: "Remy Sharp",
                                        src: ""
                                    })
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Menu__WEBPACK_IMPORTED_MODULE_11___default()), {
                                sx: {
                                    mt: "45px"
                                },
                                id: "menu-appbar",
                                anchorEl: anchorElUser,
                                anchorOrigin: {
                                    vertical: "top",
                                    horizontal: "right"
                                },
                                keepMounted: true,
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "right"
                                },
                                open: Boolean(anchorElUser),
                                onClose: handleCloseUserMenu,
                                children: settings.map((setting)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_12___default()), {
                                        onClick: handleCloseUserMenu,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_5___default()), {
                                            align: "center",
                                            children: setting
                                        })
                                    }, setting))
                            })
                        ]
                    })
                ]
            })
        })
    });
};


/***/ }),

/***/ 800:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ })

};
;