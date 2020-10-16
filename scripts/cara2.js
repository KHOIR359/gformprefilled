chrome.storage.sync.get('data', (opt) => {
    if (opt.data) {


        let download = document.querySelector("a#dlbutton");

        if (window.CustomEvent) {
            var middleClick = new MouseEvent("click", {
                "button": 1,
                "which": 1
            });
            download.dispatchEvent(middleClick);
        }
        setTimeout(() => {
            window.close()
        }, 100);
    }

})