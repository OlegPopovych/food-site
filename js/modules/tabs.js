function tabs(tabsSelector, tabsContentSelector, TabsParentSelector, activeClass) {

	const tabsBtn = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsBtnParent = document.querySelector(TabsParentSelector);

	function hideContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show');
		});

		tabsBtn.forEach((item) => {
			item.classList.remove(activeClass);
		});
	}

	function showContent(i = 0) {
		tabsBtn[i].classList.add(activeClass);
		tabsContent[i].classList.add('show');
	}
	hideContent();
	showContent();

	tabsBtnParent.addEventListener('click', (e) => {
		let target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabsBtn.forEach((item, i) => {
				if (target === item) {
					hideContent();
					showContent(i);
				}
			});
		}
	});
}

export default tabs;
