export const Colors = {
    //UI Neutrals
    ui_grey_05: "#F2F2F2",
    ui_grey_10: "#E4E4E3",
    ui_grey_20: "#CBCACA",
    ui_grey_50: "#888888",
    ui_grey_70: "#4D4C4C",
    ui_grey_80: "#333333",
    ui_grey_90: "#161616",

    // background
    ui_light_selected_bg: "#E7F5FF",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDateMonth = (value: string) => {
    const date = new Date(value);
    let month = months[date.getMonth()];
    return `${date.getDate()}\n${month}`
}