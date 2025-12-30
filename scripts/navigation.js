// 导航和语言切换功能 | Navigation and language switch functionality for the game manual
let currentLanguage = localStorage.getItem('language') || 'en-US';
// 当前侧边栏类型（可选值：contents, contents_basic, contents_ex） | Current sidebar type (Possible values: contents, contents_basic, contents_ex)
let currentSidebar = 'contents';

// 页面DOM加载完成后初始化 | Initialize the page when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
	// 根据当前语言设置页脚iframe的初始地址 | Set initial src for footer iframe based on current language
	const footerIframe = document.getElementById('footer-iframe');
	if (footerIframe) {
		footerIframe.src = `./docs/${currentLanguage}/footer.html`;
		// 处理iframe加载错误 | Handle iframe loading errors
		footerIframe.onerror = function () {
			console.error('Error loading footer');
			footerIframe.style.display = 'none';
		};
	}

	initNavigation();
	updateLanguageDisplay();
	loadSidebar('contents');
});

// 初始化页面导航（处理URL哈希值及哈希值变化） | Initialize page navigation (handle URL hash and hash changes)
function initNavigation() {
	// 从URL中获取哈希值（去除#符号） | Get hash value from URL (remove the # symbol)
	const hash = window.location.hash.substring(1);
	if (hash) {
		loadContent(hash);
	} else {
		// 若没有哈希值，默认加载"concept"内容 | Load default content "concept" if no hash exists
		loadContent('concept');
		window.location.hash = 'concept';
	}

	// 监听URL哈希值变化，加载对应内容 | Listen for URL hash changes to load corresponding content
	window.addEventListener('hashchange', function () {
		const hash = window.location.hash.substring(1);
		if (hash) {
			loadContent(hash);
		}
	});
}

// 切换手册的当前显示语言 | Switch the current language of the manual
function switchLanguage(lang) {
	currentLanguage = lang;
	// 将当前语言存入本地存储，持久化保存 | Save current language to localStorage for persistence
	localStorage.setItem('language', lang);
	updateLanguageDisplay();

	// 以新语言重新加载当前侧边栏 | Reload the current sidebar with new language
	loadSidebar(currentSidebar);

	// 若存在哈希值，重新加载当前内容页面 | Reload current content page if hash exists
	const hash = window.location.hash.substring(1);
	if (hash) {
		loadContent(hash);
	}
}

// 更新页面元素，反映当前选中的语言 | Update page elements to reflect current language
function updateLanguageDisplay() {
	// 更新语言按钮的激活状态 | Update active state of language buttons
	const langButtons = document.querySelectorAll('.lang-btn');
	langButtons.forEach(btn => {
		if (btn.getAttribute('data-lang') === currentLanguage) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	});

	// 根据当前语言更新页面标题 | Update page title based on current language
	const titles = {
		'en-US': 'Fortune Summoners Manual',
		'zh-CN': '《命运召唤 尔茄的精灵石》游戏手册'
	};
	document.title = titles[currentLanguage] || titles['en-US'];

	// 以新语言更新页脚iframe地址 | Update footer iframe src with new language
	const footerIframe = document.getElementById('footer-iframe');
	if (footerIframe) {
		footerIframe.src = `./docs/${currentLanguage}/footer.html`;
		// 处理iframe加载错误 | Handle iframe loading errors
		footerIframe.onerror = function () {
			console.error('Error loading footer');
			footerIframe.style.display = 'none';
		};
		// 加载成功后显示iframe | Show iframe when loaded successfully
		footerIframe.onload = function () {
			footerIframe.style.display = '';
		};
	}
}

// 根据侧边栏类型和当前语言加载侧边栏内容 | Load sidebar content based on sidebar type and current language
function loadSidebar(sidebarType) {
	currentSidebar = sidebarType;
	const sidebar = document.getElementById('sidebar');
	const sidebarFile = `docs/${currentLanguage}/${sidebarType}.html`;

	fetch(sidebarFile)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to load ${sidebarFile}`);
			}
			return response.text();
		})
		.then(html => {
			sidebar.innerHTML = html;
			convertSidebarLinks();
		})
		.catch(error => {
			console.error('Error loading sidebar:', error);
			sidebar.innerHTML = '<p>Error loading sidebar</p>';
		});
}

// 滚动内容区域至顶部 | Scroll content area to the top
function scrollToContentTop() {
	const content = document.getElementById('content');
	if (content) {
		content.scrollTop = 0;
	}
}

// 根据页面ID和当前语言加载主内容页面 | Load main content page based on page ID and current language
function loadContent(pageId) {
	const content = document.getElementById('content');
	const contentFile = `docs/${currentLanguage}/${pageId}.html`;
	const footerIframe = document.getElementById('footer-iframe');

	fetch(contentFile)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to load ${contentFile}`);
			}
			return response.text();
		})
		.then(html => {
			// 为新内容创建包装容器 | Create a wrapper for the new content
			const contentWrapper = document.createElement('div');
			contentWrapper.className = 'c_main_body';
			contentWrapper.innerHTML = html;

			// 移除旧的内容包装容器（若存在） | Remove old content wrapper if exists
			const oldWrapper = content.querySelector('.c_main_body');
			if (oldWrapper) {
				oldWrapper.remove();
			}

			// 在页脚iframe之前插入新内容 | Insert new content before footer iframe
			if (footerIframe && footerIframe.parentNode === content) {
				content.insertBefore(contentWrapper, footerIframe);
			} else {
				content.appendChild(contentWrapper);
			}

			// 根据当前语言更新页脚iframe地址 | Update footer iframe src with current language
			if (footerIframe) {
				footerIframe.src = `./docs/${currentLanguage}/footer.html`;
			}
			convertContentLinks();

			// 加载完成后滚动至内容顶部 | Scroll to content top after loading
			scrollToContentTop();
		})
		.catch(error => {
			console.error('Error loading content:', error);
			content.innerHTML = '<p>Error loading content</p>';
		});
}

// 转换侧边栏链接，适配单页导航 | Convert sidebar links to work with single-page navigation
function convertSidebarLinks() {
	const sidebar = document.getElementById('sidebar');

	// 处理侧边栏切换链接（contents, contents_basic, contents_ex） | Handle sidebar switch links (contents, contents_basic, contents_ex)
	const contentsLinks = sidebar.querySelectorAll('a[href*="contents"]');
	contentsLinks.forEach(link => {
		const href = link.getAttribute('href');
		// 提取文件名（去除路径和扩展名） | Extract file name without path and extension
		let fileName = href.replace(/^\.\//, '').replace(/^\.\.\//, '').replace(/.*\//, '').replace(/\.(htm|html)$/, '');
		if (fileName === 'contents_basic') {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				loadSidebar('contents_basic');
				scrollToContentTop();
			});
		} else if (fileName === 'contents_ex') {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				loadSidebar('contents_ex');
				scrollToContentTop();
			});
		} else if (fileName === 'contents') {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				loadSidebar('contents');
				scrollToContentTop();
			});
		}
	});

	// 处理内容页面链接（排除侧边栏链接和外部链接） | Handle content page links (exclude sidebar and external links)
	const contentLinks = sidebar.querySelectorAll('a[href*=".htm"], a[href*=".html"]');
	contentLinks.forEach(link => {
		const href = link.getAttribute('href');
		if (!href.includes('contents') && !href.startsWith('http')) {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				// 提取文件名（去除路径和扩展名） | Extract file name without path and extension
				let fileName = href.replace(/^\.\//, '').replace(/^\.\.\//, '').replace(/.*\//, '').replace(/\.(htm|html)$/, '');
				window.location.hash = fileName;
				loadContent(fileName);
				scrollToContentTop();
			});
		}
	});

	// 外部链接（保持默认行为，无需转换） | External links (keep default behavior, no conversion needed)
	const externalLinks = sidebar.querySelectorAll('a[href^="http"]');
	externalLinks.forEach(link => {
		// 无需操作，保留原始链接行为 | No action needed, keep original link behavior
	});
}

// 转换内容页面内部链接，适配单页导航 | Convert content page internal links to work with single-page navigation
function convertContentLinks() {
	const content = document.getElementById('content');

	// 处理内容区域内所有内部链接 | Handle all internal links in content area
	const contentLinks = content.querySelectorAll('a[href*=".htm"], a[href*=".html"]');
	contentLinks.forEach(link => {
		const href = link.getAttribute('href');
		if (!href.startsWith('http')) {
			link.addEventListener('click', function (e) {
				e.preventDefault();
				// 提取文件名（去除路径和扩展名） | Extract file name without path and extension
				let fileName = href.replace(/^\.\//, '').replace(/^\.\.\//, '').replace(/.*\//, '').replace(/\.(htm|html)$/, '');
				window.location.hash = fileName;
				loadContent(fileName);
				// 确保立即滚动至顶部 | Ensure scroll to top immediately
				setTimeout(scrollToContentTop, 0);
			});
		}
	});
}

// 暴露函数到全局window对象，供HTML直接调用 | Expose functions to global window for direct HTML calls
window.switchLanguage = switchLanguage;
window.loadContent = loadContent;
window.loadSidebar = loadSidebar;