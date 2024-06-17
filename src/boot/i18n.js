import {createI18n} from "vue-i18n";
import messages from "/src/language_main";

export default ({app}) => {
    // console.log(messages)

    // 创建实例
    const i18n = createI18n({
        locale: "zh-CN",
        legacy: false,
        messages,
    });

    // 注册到 vue 中
    app.use(i18n);
};
