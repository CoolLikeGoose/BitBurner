import { TextDisplay } from "../components/TextDisplay.tsx";

export function MainPage() {
    const money = TextDisplay("money", "Money");
    const ram = TextDisplay("ram", "RAM");

    const components = { money, ram };

    return {
        components,

        render() {
            return (
                <div>
                    {money.render()}
                    {ram.render()}
                </div>
            );
        },

        bind(root) {
            money.bind(root);
            ram.bind(root);
        },

        update(data) {
            if (data.money !== undefined) money.update(data.money);
            if (data.ram !== undefined) ram.update(data.ram);
        }
    };
}
