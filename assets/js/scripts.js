window.addEventListener("DOMContentLoaded", () => {
    // Скрипт поисковой строки
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchCategoriesSelect = document.querySelector('.search-categories-select');

    function sendSearchRequest() {
        const searchTerm = searchInput.value;
        const selectedCategory = searchCategoriesSelect.value;
    }

    searchButton.addEventListener('click', () => {
        sendSearchRequest();
        // выполнение поиска с использованием searchTerm и selectedCategory
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            sendSearchRequest();
        }
    });

    // Кастомный селект выбора категории в поисковой строке
    const categorySelects = document.querySelectorAll('.search-categories-select');

    categorySelects.forEach((categoriesSelect) => {
        const categoriesSelected = categoriesSelect.querySelector('.search-categories-selected');
        const categoriesList = categoriesSelect.querySelector('.search-categories-list');
        const categoriesItems = categoriesSelect.querySelectorAll('.search-categories-item');

        categoriesSelected.addEventListener('click', () => {
            categoriesSelect.classList.toggle('open');
        });

        categoriesItems.forEach((item) => {
            item.addEventListener('click', () => {
                const value = item.dataset.value;
                categoriesSelected.innerHTML = item.innerHTML;
                categoriesSelected.dataset.value = value;
                categoriesSelect.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!categoriesSelect.contains(e.target)) {
                categoriesSelect.classList.remove('open');
            }
        });

        const searchButton = categoriesSelect.nextElementSibling;

        searchButton.addEventListener('click', () => {
            const searchInput = categoriesSelect.previousElementSibling.querySelector('.search-input');
            const searchValue = searchInput.value.trim();
            const categoryValue = categoriesSelected.dataset.value;

            // Здесь можно написать код для отправки запроса на сервер
            console.log('Search:', searchValue, 'Category:', categoryValue);
        });
    });

    // Открытие поисковой строки в хедере на мобильном разрешении
    const searchMobOpener = document.querySelector('.header-main__search-mob-opener');
    const searchHeaderField = document.querySelector('.header-main__search .search-wrapper');
    console.log(searchMobOpener, searchHeaderField);

    searchMobOpener.addEventListener('click', () => {
        searchHeaderField.style.display = "flex";
    })

    // Кнопка меню в хеддере и открытие меню + аккардеоны в меню
    const headerMenu = document.querySelector('.header-main__menu');
    const headerMenuWrapper = document.querySelector('.header-main__menu-wrapper');
    const headerMenuClose = document.querySelector('.header-main__menu-close');
    // Change old start 05.03 - скорректировал событие клика
    headerMenu.addEventListener('click', () => {
        headerMenuWrapper.classList.add('open');
    });
    // Change old end 05.03
    headerMenuClose.addEventListener('click', () => {
        headerMenuWrapper.classList.remove('open');
    });

    // Создание и работа аккардеонов в меню на мобильном разрешении
    var menuBox = document.querySelectorAll(".header__nav-box");

    menuBox.forEach((item) => {
        if (window.innerWidth <= 768) {
            item.classList.remove('open');

            item.addEventListener("click", function () {
                item.classList.toggle("open");
            });
        }
    });

    // Скрипт переполнения категорий (аккунты, игры)
    const horScrollContainer = document.querySelectorAll('.hor-scroll-menu');

    horScrollContainer.forEach(elem => {
        const horScrollWrapper = elem.querySelector('.hor-scroll-menu__wrapper');
        const horScrollLeftArrow = elem.querySelector('.hor-scroll-menu__arrow_left');
        const horScrollRightArrow = elem.querySelector('.hor-scroll-menu__arrow_right');
        const horScrollCatalogLink = elem.querySelector('.hor-scroll-menu__link');


        if (horScrollWrapper.scrollWidth > horScrollWrapper.clientWidth) {
            console.log("Больше - выводим элементы");
            horScrollWrapper.style.marginLeft = "20px";
            horScrollWrapper.style.marginRight = "20px";
            horScrollWrapper.style.justifyContent = "flex-start";

        } else {
            console.log("Меньше - элементы скрыты");
            horScrollLeftArrow.style.display = "none";
            horScrollRightArrow.style.display = "none";
            horScrollCatalogLink.style.display = "none";
        }

        const horScrollMenuItems = elem.querySelectorAll('.hor-scroll-menu__item');
        let activeItem = horScrollMenuItems?.[0];

        let prevActiveItem = activeItem?.previousElementSibling;
        let nextActiveItem = activeItem?.nextElementSibling;
        activeItem?.classList?.add('hor-scroll-menu__item_active');

        const onChangeActiveItem = (element) => {
            if (activeItem) {
                activeItem.classList.remove('hor-scroll-menu__item_active');
            }
            activeItem = element;
            prevActiveItem = element.previousElementSibling;
            nextActiveItem = element.nextElementSibling;
            element.classList.add('hor-scroll-menu__item_active');
            element.scrollIntoView({ behavior: "smooth" })

        }

        horScrollLeftArrow.addEventListener('click', () => {
            if (prevActiveItem) {
                onChangeActiveItem(prevActiveItem)
            }
        })

        horScrollRightArrow.addEventListener('click', () => {
            if (nextActiveItem) {
                onChangeActiveItem(nextActiveItem)
            }
        })

        horScrollMenuItems.forEach(element => {
            element.addEventListener('click', ({ currentTarget }) => {
                onChangeActiveItem(currentTarget);
            })
        });
    })


    // Кастомные селекты секций (Игры, Каталог)
    const selects = document.querySelectorAll('.select');
    // Change_old start 05.03 - скрипт изменен таким образом, чтобы список закрывался при клике вне селектора и после выбора категории
    selects.forEach((select) => {
        const categoriesSelected = select.querySelector('.selected');
        const categoriesItems = select.querySelectorAll('.item');


        select.addEventListener('click', () => {
            select.classList.add('open');
        });

        categoriesItems.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();
                const value = item.dataset.value;
                // Change_old start - item.innerHTML изменен на item.firstElementChild.innerHTML чтобы выбранный элемент выводился без item__descriptions
                categoriesSelected.innerHTML = item.firstElementChild.innerHTML;
                // Change_old end
                categoriesSelected.dataset.value = value;
                select.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        });
    });
    // Change_old end 05.03

    // Скрипт блока faq
    const faqItems = document.querySelectorAll(".faq__item");

    faqItems.forEach((faqItem) => {
        faqItem.addEventListener("click", function () {
            faqItem.classList.toggle("open");
        });
    });


    // Переключение цветовой темы
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    const lightSwitch = document.querySelectorAll('.header-main__color-theme-dark');
    const darkSwitch = document.querySelectorAll('.header-main__color-theme-light');

    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.body.className = themeName;
    }

    lightSwitch.forEach((item) => {
        item.addEventListener('click', () => {
            setTheme('light')
        })
    });

    darkSwitch.forEach((item) => {
        item.addEventListener('click', () => {
            setTheme('dark')
        })
    });

    // Страница Игры - 05.03 Меню элементов без горизонтальной прокрутки и селекта на мобильной версии (по дизайну) 

    // Скрипт меню категорий (аккунты, игры)
    const horUnScrollContainer = document.querySelectorAll('.hor-unscroll-menu');

    horUnScrollContainer.forEach(elem => {
        const horUnScrollMenuItems = elem.querySelectorAll('.hor-unscroll-menu__item');
        let activeItem = horUnScrollMenuItems?.[0];

        activeItem?.classList?.add('hor-unscroll-menu__item_active');

        const onChangeActiveItem = (element) => {
            if (activeItem) {
                activeItem.classList.remove('hor-unscroll-menu__item_active');
            }
            activeItem = element;
            element.classList.add('hor-unscroll-menu__item_active');

        }

        horUnScrollMenuItems.forEach(element => {
            element.addEventListener('click', ({ currentTarget }) => {
                onChangeActiveItem(currentTarget);
            })
        });
    })

    // Скрипт копирования промокодов
    const promoContainer = document.querySelectorAll('.promocode__wrapper');

    promoContainer.forEach(elem => {
        const promoCopy = elem.querySelectorAll('.promocode__copy');
        let activeItem;

        promoCopy.forEach(item => {
            item.addEventListener('click', () => {
                navigator.clipboard.writeText(item.previousElementSibling.innerHTML).then(
                    item.classList.add('promocode__copy_active')
                );
            });
        });

        const onChangeActiveItem = (element) => {
            if (activeItem) {
                activeItem.classList.remove('promocode__copy_active');
            }
            activeItem = element;
            element.classList.add('promocode__copy_active');
        }

        promoCopy.forEach(element => {
            element.addEventListener('click', ({ currentTarget }) => {
                onChangeActiveItem(currentTarget);
            })
        });
    });
});