import languagesData from "../../file-editor/components/LanguagesData";
import fileIcon from "../../../assets/fileIcon.png";

const GetLanguageInfos = (filename) => {
    const extension = filename.split(".").pop();
    const languageInfo = languagesData[extension];

    if (languageInfo !== undefined) {
        return {
            name: languageInfo.name,
            imgUrl: languageInfo.imgUrl
        };
    } else {
        return {
            name: "Undefined",
            imgUrl: fileIcon
        };
    }
};

export default GetLanguageInfos;


