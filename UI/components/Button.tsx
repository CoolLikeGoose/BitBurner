export function Button(id: string, label: string, onClick: () => void) {
    let el: HTMLElement | null = null;

    return {
        id,

        render() {
            return (
                <button id={id} className="bb-button">
                    {label}
                </button>
            );
        },

        bind(root: Document) {
            el = root.getElementById(id);
            if (el) el.onclick = onClick;
        },

        update() {}
    };
}
