sass/
|
|– abstracts/
|   |– _variables.scss    # Sass переменные
|   |– _functions.scss    # Sass функции
|   |– _mixins.scss       # Sass миксины
|   |– _placeholders.scss # Sass плейсхолдеры
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Типографика
|   …                     # Прочее
|
|– components/
|   |– _buttons.scss      # Кнопки
|   |– _carousel.scss     # Карусель
|   |– _cover.scss        # Обложка
|   |– _dropdown.scss     # Выпадашка
|   …                     # и так далее
|
|– layout/
|   |– _navigation.scss   # Навигация
|   |– _grid.scss         # Сетка
|   |– _header.scss       # Шапка
|   |– _footer.scss       # Футер
|   |– _sidebar.scss      # Сайдбар
|   |– _forms.scss        # Формы
|   …                     # и так далее
|
|– pages/
|   |– _home.scss         # Специфичные стили страницы Home
|   |– _contact.scss      # Специфичные стили страницы Contact
|   …                     # и так далее
|
|– themes/
|   |– _theme.scss        # Тема по умолчанию
|   |– _admin.scss        # Тема админа
|   …                     # и так далее
|
|– vendors/
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # и так далее
|
`– main.scss              # Главный Sass файл



вкратце:
abstracts/ - тут все инструменты и хелперы sass. сюда относятся: _variables, _mixins, _functions

base/ - содержит то, что мы можем назвать общим шаблоном проекта. 
  -  _base.scss - все ресеты, и медиа запросы на изменение 1rem
  -  _typography.scss - стили для заголовков и параграфов
  -  _utilities - служебные стили, типа .u-center-text {text-align: center !important}. начинается с .u-
  -  _animations

layout/ - стили для кусков сайта, типа _footer, _header, _navigation, _sidebar. Определяют общий каркас.

components/ - в свою очередь, это более мелкие виджеты и модули, типа _thumbnail, _carousel, _card, _story

pages/ - стили для отдельных страниц сайта, типа _home, _contacts

themes/ - темы проектов, но я думаю это мне не пригодится

vendors/ - внешние библиотеки, типа _bootstrap.sccs, _jquery.scss


Импортировать блоками, типа:
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/placeholders';

@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'base/reset';
@import 'base/typography';