import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    white: "#fff",
    black: "#000000",
    blue: "#4096FE",
    gray: "#464646",
    lightGray: "#dedede",
    mailaWhite:'#F3F3F3',
    stopModalGray: '#E6E6E6',
    transparentBlack: 'rgba(0, 0, 0, 0.2)',
    transparentBlack1: 'rgba(0, 0, 0, 0.5)',
    slateGray:"#2C2E35",
    AlmostWhite:'#FFFEFE',
    LoginGreen:"#9CE3A8",
    LoginButtonDisabled:"rgba(156, 227, 168,0.5)",
    RegisterGray:"#909090",
    RupeesPink:"#FF8B8B",
    TransactionCardBeige:'#FFFFFF',
    BluishBalance:'#F0EBE3',
    // Yellow:'#'

};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Ubuntu-Regular", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;