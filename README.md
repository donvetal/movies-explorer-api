# Project Movies Explorer Api

**Описание проекта:**

Бэкенд для приложения проекта.
<br/>
* Бэкенд: http://api.kino-explorer.nomoredomains.club
* IP-адрес сервера: 130.193.43.158 

<br/>
Функционал API:
<br/>
1. Регистрация, авторизация (через Cookie)
   <br/>
2. Редактирование, получение информации профиля
   <br/>
3. Добавление, удаление, получение списка фильмов
   <br/>
4. Выход из системы, проверка авторизации для фронтенда
   <br/>

Роуты
<br/>
* /signup (POST)
* /signin (POST)
* /signout (GET)  
* /users/me (GET, PATCH)
* /movies (GET, POST)  
* /movies/:movieId (DELETE)

