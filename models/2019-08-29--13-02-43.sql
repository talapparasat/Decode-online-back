INSERT INTO "Statuses"("id", "status") VALUES
	(1, 'Новичок'),
	(2, 'Выпускник'),
	(3, 'Ищу работу'),
	(4, 'Продвинутый'),
	(5, 'Есть работа');
ALTER SEQUENCE "Statuses_id_seq" RESTART WITH 6;

INSERT INTO "Clans"("id", "clan", "img") VALUES
	(1, null, null),
	(2, 'Konoha', null),
	(3, 'Kiri', null),
	(4, 'Kumo', null),
	(5, 'Iwa', null),
	(6, 'Suna', null);
ALTER SEQUENCE "Clans_id_seq" RESTART WITH 7;

INSERT INTO "Users"("id", "name", "email", "password", "role", "avatar", "statusId", "clanId", "date") VALUES
	(2, 'EskaMladwi', 'eskam@mail.ru', '$2a$10$RCRisdhiuF6J7ksl53hgLOIa1b5oyYdjlGshdnyrKUUTWlw.4K0aK', 'user', '//www.gravatar.com/avatar/46bcf906dd0185490365854b01d2021b?s=200&r=pg&d=mm', 1, 1, '2019-06-25 13:49:45.627000+03:00'),
	(4, 'Eskendir', 'eska@gmail.com', '$2a$10$9kTf03ocyfyaLC8eN1tE3u9HWRjSynvyJSFrsgFJNoQ4C7Vi2gsiW', 'user', '//www.gravatar.com/avatar/d4685fa5b1645e8cd17b4c558e1465c4?s=200&r=pg&d=mm', 3, 1, '2019-06-25 13:51:12.757000+03:00'),
	(5, 'EskaMladwi', 'eskam@mail.ru', '$2a$10$RCRisdhiuF6J7ksl53hgLOIa1b5oyYdjlGshdnyrKUUTWlw.4K0aK', 'user', '//www.gravatar.com/avatar/46bcf906dd0185490365854b01d2021b?s=200&r=pg&d=mm', 1, 1, '2019-06-25 13:49:45.627000+03:00'),
	(7, 'yedil', 'yedil@gmail.com', '$2a$10$9IttoNgh4ZSx30rbqj90Ye74hRh.ZONPNIiOTCd4v18t3Olf8g6Va', 'user', '//www.gravatar.com/avatar/c9152711c0f9ab4033babd77ababe776?s=200&r=pg&d=mm', 1, 1, '2019-06-25 13:49:59.414000+03:00'),
	(8, 'Edil', 'edil@mail.ru', '$2a$10$yWzqO5njNkVwf1OD4LdzwOok1tJRayhwBMV6AMW.2YAFFLeFEvUXK', 'user', '//www.gravatar.com/avatar/5a148c31760c9f783c5591f514f0c735?s=200&r=pg&d=mm', 3, 2, '2019-05-16 13:58:47.551000+03:00'),
	(9, 'Eskendir', 'eska@gmail.com', '$2a$10$9kTf03ocyfyaLC8eN1tE3u9HWRjSynvyJSFrsgFJNoQ4C7Vi2gsiW', 'user', '//www.gravatar.com/avatar/d4685fa5b1645e8cd17b4c558e1465c4?s=200&r=pg&d=mm', 3, 1, '2019-06-25 13:51:12.757000+03:00'),
	(10, 'yedil', 'yedil@gmail.com', '$2a$10$eHigTAj8kXFEnoXHaAwf/egh4xZ3bIB.U3GwH6mwp6IUQTOIxQi0K', 'user', '//www.gravatar.com/avatar/c9152711c0f9ab4033babd77ababe776?s=200&r=pg&d=mm', 1, 1, '2019-06-25 13:49:59.414000+03:00'),
	(11, 'yedil', 'yyedil@mail.ru', '$2a$10$CBpuHN.GIh4P32J93ENXv.KbsGTUga8LFHJ5BsFRZyH4nTE0idcuO', 'user', '//www.gravatar.com/avatar/daa85ede47e33ea9173d6a61875dc296?s=200&r=pg&d=mm', 1, 1, '2019-07-04 10:21:20.047000+03:00'),
	(12, 'edil', 'yedil@mail.ru', '$2a$10$0e.Hhrs6tJDHnfcYzusRieXRA.ah8t1Nq0vtbYCFjonQGMf10v.ge', 'user', 'http://localhost:5001/profileimage/edil1562235956516.jpg', 1, 1, '2019-07-01 10:12:49.362000+03:00'),
	(13, 'Edil', 'edil@mail.ru', '$2a$10$yWzqO5njNkVwf1OD4LdzwOok1tJRayhwBMV6AMW.2YAFFLeFEvUXK', 'user', '//www.gravatar.com/avatar/5a148c31760c9f783c5591f514f0c735?s=200&r=pg&d=mm', 3, 3, '2019-05-16 13:58:47.551000+03:00'),
	(3, 'decode', 'decode@mail.ru', '$2a$10$aLrHzrk/WHU6GDeY04k9JeyBhKarygYrMpK3o69xhoCH.PrFiA/Yu', 'admin', '//www.gravatar.com/avatar/5b8f5494466f429fe9769d0e74d23dfa?s=200&r=pg&d=mm', 3, 2, '2019-05-16 13:58:56.875000+03:00'),
	(1, 'test
', 'qwerty@mail.ru', '$2a$10$4qy39L4084VVdragDHREiOfCZ.ZiI0Ey424BKk6j0er7On7/YjTfm', 'admin', 'http://localhost:5001/profileimage/1563359321759.png', 1, 2, '2019-05-24 12:56:49.873000+03:00'),
	(6, '12', 'decode@mail.ru', '$2a$10$aLrHzrk/WHU6GDeY04k9JeyBhKarygYrMpK3o69xhoCH.PrFiA/Yu', 'user', 'http://localhost:5001/profileimage/121564041184991.jpg', 3, 2, '2019-05-16 13:58:56.875000+03:00'),
	(24, 'askar111111156123', 'askar11q123@gmail.com', '$2a$10$/dNcAHQTxdthOWnZGd0mwuMAnfNl2OKHapu16iJnCgt.myM2q3V/G', 'user', '//www.gravatar.com/avatar/b699de59e651387ccc5a946490f103b5?s=200&r=pg&d=mm', 1, 1, '2019-08-22 11:05:38.779000+03:00'),
	(25, 'qwerty', 'qwer@gmail.com', '$2a$10$fNN6Lx7gGt/4DKAufWl4j.s/ziRYighODcy57davPaJwqIqwH.YqO', 'user', '//www.gravatar.com/avatar/bdee75861beca8a4c67338a5c9528022?s=200&r=pg&d=mm', 1, 1, '2019-08-22 11:54:04.431000+03:00'),
	(26, 'asd', 'asd@mail.ru', '$2a$10$br2JdFU2PQJRvWDaNJC8oeamIVqeu8zkdt0kpuM9Cvlc1bZVKlG32', 'user', '//www.gravatar.com/avatar/543b407ee9b737d7aede31f706f6efd3?s=200&r=pg&d=mm', 1, 1, '2019-08-22 11:55:56.753000+03:00'),
	(27, 'zhanerke', 'zhanerke@mail.ru', '$2a$10$hu0UiLA93XVoFBdze3Vmzebn8Xxivojmq/II5N5pV7RISnrqQCdxC', 'user', '//www.gravatar.com/avatar/337550286a7b55e940f3ac78cc4395e3?s=200&r=pg&d=mm', 1, 1, '2019-08-22 11:57:54.782000+03:00'),
	(28, 'asdzxc', 'asdzxc@mail.ru', '$2a$10$hghsIswTdDexSKvKF1zSbufcKRTC/cpFwq0dA0bsdpKDD0IAyDqfa', 'user', '//www.gravatar.com/avatar/79fac92f0e60e54f538c9171cf0a9c75?s=200&r=pg&d=mm', 1, 1, '2019-08-26 12:28:14.905000+03:00');
ALTER SEQUENCE "Users_id_seq" RESTART WITH 29;

INSERT INTO "Courses"("id", "name", "description", "video") VALUES
	(3, 'Course3', 'Course Description 3', null),
	(2, 'sdf', 'sdf', 'http://localhost:5001/coursevideo/1563367305361.mp4'),
	(4, 'Python', 'Высокоуровневый язык', 'https://d3c33hcgiwev3.cloudfront.net/ykr2EZoKEee0Og67FoOFmg.processed/full/360p/index.webm?Expires=1564099200&Signature=GkMIZE3gn2vJs1GHdFQm6sZQIVxOTMyI-rgqf8XKXO56VVY6sDwoLZNWJAWIkYLkqZpDxrqdsYDJPpgMVpzFNu5ljkd2Y3-kT1DQtg62aB3TU~Drudi6dT7Uz7AXjzG42yaln2BEM8fR2ge9TyF8yQZQQ3072aKpZEthTXiU9n8_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A');
ALTER SEQUENCE "Courses_id_seq" RESTART WITH 5;

INSERT INTO "Sections"("id", "name", "description", "prerequisite", "level_count", "img", "order", "courseId") VALUES
	(4, 'Section 4', 'Section desc 4', 0, 11, 'iemejkfs', 1, 2),
	(5, 'Section 5', 'Section desc 5', 1, 5, 'iemejkfs', 1, 2);
ALTER SEQUENCE "Sections_id_seq" RESTART WITH 6;

INSERT INTO "UserLevels"("id", "level", "sectionId", "userId") VALUES
	(4, 6, 4, 2),
	(5, 5, 5, 1);
ALTER SEQUENCE "UserLevels_id_seq" RESTART WITH 6;

INSERT INTO "Levels"("id", "title", "order", "price", "sectionId") VALUES
	(10, 'Level10', 1, 80, 4),
	(11, 'Level11', 1, 150, 5),
	(12, 'Level12', 2, 120, 5),
	(13, 'Level13', 3, 100, 5);
ALTER SEQUENCE "Levels_id_seq" RESTART WITH 14;

INSERT INTO "Comments"("id", "content", "like", "dislike", "date", "userId") VALUES
	(1, 'hello112', 0, 1, '2019-08-21 11:00:53.205000+03:00', 1),
	(5, 'asd', 1, 0, '2019-08-21 14:14:06.571000+03:00', 3),
	(8, 'dwdwd', 2, 0, '2019-08-26 12:56:20.791000+03:00', 28),
	(9, 'Comment', 0, 0, '2019-08-27 08:49:33.538000+03:00', 1),
	(11, 'qwe', 0, 0, '2019-08-27 14:45:04.504000+03:00', 27),
	(10, 'asd', 1, 0, '2019-08-27 14:45:02.234000+03:00', 27),
	(7, 'fvgbhnjmk,l;.'/
', 1, 0, '2019-08-26 12:55:46.755000+03:00', 28),
	(2, 'asdasdasd', 4, 0, '2019-08-21 11:12:27.317000+03:00', 3),
	(6, 'asdasd', 3, 0, '2019-08-26 12:38:15.045000+03:00', 28),
	(3, 'hello112', 2, 0, '2019-08-21 11:15:48.503000+03:00', 1),
	(4, 'ss', 1, 0, '2019-08-21 13:56:00.296000+03:00', 3);
ALTER SEQUENCE "Comments_id_seq" RESTART WITH 5;

INSERT INTO "CommentTypes"("id", "commentId", "type", "typeId") VALUES
	(1, 1, 'Task', 7),
	(2, 2, 'Lesson', 7),
	(3, 3, 'Lesson', 7),
	(4, 4, 'Lesson', 7),
	(5, 5, 'Lesson', 7),
	(6, 6, 'Lesson', 7),
	(7, 7, 'Lesson', 7),
	(8, 8, 'Lesson', 5),
	(9, 9, 'Lesson', 5),
	(10, 10, 'Help', 1),
	(11, 11, 'Help', 1);
ALTER SEQUENCE "CommentTypes_id_seq" RESTART WITH 12;

INSERT INTO "Lessons"("id", "title", "description", "number_of_likes", "number_of_dislikes", "short_content", "content", "levelId") VALUES
	(5, 'Lesson 5', 'Lesson 5 Description', 0, 0, 'Short Description of Lesson 5', 'Content of Lesson 5', 10),
	(6, 'Lesson 6', 'Lesson 6 Description', 0, 0, 'Short Description of Lesson 6', 'Content of Lesson 6', 10),
	(8, 'Lesson 8', 'Lesson 8 Description', 0, 0, 'Short Description of Lesson 8', 'Content of Lesson 8', 12),
	(9, 'Lesson 9', 'Lesson 9 Description', 0, 0, 'Short Description of Lesson 9', 'Content of Lesson 9', 12),
	(10, 'Lesson', 'asa', 0, 0, '1', '<h3>Уровень 1</h3>

<p>&mdash; Поздравляю с достижением первого уровня!</p>

<p>&mdash; Спасибо! Это было легче, чем казалось!</p>

<p>&mdash; А главное &mdash; интересно!</p>

<p>&mdash; Дальше будет еще интереснее. Сейчас ты сам в этом убедишься. Готов?</p>

<p>&mdash; Поехали!</p>

<h2>Будущее наступило</h2>

<p><a href="https://javarush.ru/api/1.0/rest/images/739040/f2f9cbf3-7ccb-477c-a0d0-e7b190681ec9" target="_blank"><img alt="Вы достигли 1 уровня - 1" src="https://javarush.ru/api/1.0/rest/images/739040/f2f9cbf3-7ccb-477c-a0d0-e7b190681ec9?size=0" /></a></p>

<p>Одними из атрибутов 20-го века были пылесос, стиральная машина, телевизор и автомобиль.</p>

<p>Если вы продолжаете стирать одежду вручную, ездите на лошади, используйте свечи для освещения, то, по меркам 20-го века, вы живете &mdash; в 19-м.</p>

<p>Атрибутами 21-го века стали интернет, мобильный телефон, skype, социальные сети.</p>

<p><strong>С помощью интернета можно получить доступ к любой информации известной человечеству.</strong>&nbsp;В интернете можно работать и вести бизнес, получить образование и преподавать.</p>

<p>С помощью социальных сетей можно найти друзей, работу, девушку, группу по интересам. Вы можете познакомиться практически с любым человеком в мире, попросить у него совета или помощи. Вы можете заводить друзей во всем мире, а потом приехать в гости или пригласить их к себе, или съездить куда-то вместе.</p>

<p>С помощью скайпа вы можете пообщаться со своими друзьями, братьями, сестрами, родителями, родственниками, и любыми людьми во всем мире.&nbsp;<strong>Бесплатная видеосвязь с любой точкой мира. Об этом 20 лет назад даже и мечтать не смели.</strong>Сейчас это обыденный факт.</p>

<p>Google Street View позволит вам &laquo;прогуляться&raquo; по улицам любого города любой страны земного шара. Вы можете выбрать место, где хотели бы провести всю свою жизнь, и приехать туда.</p>

<p>Владелец &laquo;современного телефона&raquo; может: говорить, писать сообщения, пересылать картинки, искать информацию в интернете, установить сотни тысяч бесплатных приложений. Что еще? Делать видео-звонки, слушать музыку, смотреть видео, снимать видео, делать фото, увидеть свое местоположение на карте, вести в нем заметки, использовать как органайзер, общаться в социальных сетях и лайкать котиков.</p>

<p><a href="https://javarush.ru/api/1.0/rest/images/739040/9937d5df-c17d-4a46-8156-abc54af0fcde" target="_blank"><img alt="Вы достигли 1 уровня - 2" src="https://javarush.ru/api/1.0/rest/images/739040/9937d5df-c17d-4a46-8156-abc54af0fcde?size=0" /></a></p>

<p>Вы можете за год выучить английский (или любой другой язык), слушая аудиокурсы, когда едете на работу и с работы. Любая информация доступна в интернете, любые учебники.&nbsp;<strong>Хотите видео-лекции лучших мировых вузов с субтитрами?</strong>&nbsp;Они там&nbsp;<a href="https://www.coursera.org/">тоже есть</a>.</p>

<p>Если вы владеете английским, вы можете написать книгу,&nbsp;<a href="http://www.aboutamazon.ru/2012/03/amazon-kidle.html">выложить ее на Amazon</a>&nbsp;и заработать целое состояние. Вы можете за несколько сотен долларов заказать себе сайт и вести бизнес через интернет со всем миром.</p>

<p>Хватит жить в 20-м веке и ждать, что вам скажут, что учить, когда сдавать, что делать и где жить. Решайте это сами.&nbsp;<strong>Возможности изменить свою жизнь окружают вас на каждом шагу.</strong></p>

<p>Есть такой старый анекдот, напоследок:</p>

<p>Случилось как то наводнение. Все спасаются, кто как может, и только старый, очень набожный еврей сидит и молится.<br />
Мимо проезжает грузовик, сидящие в кузове кричат:<br />
&mdash; Хаим, полезай в кузов, спасайся!<br />
&mdash; Я всю жизнь молился и соблюдал все традиции, меня Бог спасет &mdash; отвечает Хаим.<br />
Вода доходит уже до окон. Мимо проплывает лодка. Тот же вопрос и тот же ответ.<br />
Вода доходит до крыши, Хаим сидит на крыше и молится.<br />
Спускается с неба вертолет. Тот же вопрос, тот же ответ. И Хаим утонул.<br />
И уже в другом мире стал попрекать Бога:<br />
&mdash; Я всю жизнь молился и соблюдал все традиции, почему же Ты меня не спас?<br />
&mdash; Я тебе и машину, и лодку, и вертолет посылал, так в чем же дело?</p>

<p>&nbsp;</p>

<p><a href="https://javarush.ru/quests/lectures/questsyntax.level00.lecture08">Предыдущая&nbsp;лекция</a><a href="https://javarush.ru/quests/lectures/questsyntax.level01.lecture01">Следующая&nbsp;лекция</a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<ul>
</ul>
', 11),
	(7, 'Lesson 7', 'Lesson 7 Description1', 0, 0, 'Short Description of62+62+62+2+2+52+5 Lesson 7', 'Content of Lesson 7', 11);
ALTER SEQUENCE "Lessons_id_seq" RESTART WITH 8;

INSERT INTO "UserCourses"("id", "chakra", "courseId", "userId") VALUES
	(1, 95, 2, 4),
	(2, 4, 2, 1),
	(6, 18, 2, 3);
ALTER SEQUENCE "UserCourses_id_seq" RESTART WITH 7;

INSERT INTO "Tasks"("id", "title", "description", "requirements", "content", "solution", "chakra", "lessonId") VALUES
	(7, 'Task7 for Lesson7', 'Description of Task7', 'Task7 requirements', 'Task7 content', 'Task7 Solution', 8, 5),
	(8, 'Task8 for Lesson8', 'Description of Task8', 'Task8 requirements', 'Task8 content', 'Task8 Solution', 5, 6),
	(9, 'Task9 for Lesson9', 'Description of Task9', 'Task9 requirements', 'Task9 content', 'Task9 Solution', 3, 7),
	(10, 'Task10 for Lesson10', 'Description of Task10', 'Task10 requirements', 'Task10 content', 'Task10 Solution', 9, 8),
	(11, 'Task11 for Lesson11', 'Description of Task11', 'Task11 requirements', 'Task11 content', 'Task11 Solution', 4, 9);
ALTER SEQUENCE "Tasks_id_seq" RESTART WITH 12;

INSERT INTO "Comments"("id", "content", "like", "dislike", "date", "userId") VALUES
	(1, 'hello112', 0, 1, '2019-08-21 11:00:53.205000+03:00', 1),
	(5, 'asd', 1, 0, '2019-08-21 14:14:06.571000+03:00', 3),
	(8, 'dwdwd', 2, 0, '2019-08-26 12:56:20.791000+03:00', 28),
	(9, 'Comment', 0, 0, '2019-08-27 08:49:33.538000+03:00', 1),
	(11, 'qwe', 0, 0, '2019-08-27 14:45:04.504000+03:00', 27),
	(10, 'asd', 1, 0, '2019-08-27 14:45:02.234000+03:00', 27),
	(7, 'fvgbhnjmk,l;.'/
', 1, 0, '2019-08-26 12:55:46.755000+03:00', 28),
	(2, 'asdasdasd', 4, 0, '2019-08-21 11:12:27.317000+03:00', 3),
	(6, 'asdasd', 3, 0, '2019-08-26 12:38:15.045000+03:00', 28),
	(3, 'hello112', 2, 0, '2019-08-21 11:15:48.503000+03:00', 1),
	(4, 'ss', 1, 0, '2019-08-21 13:56:00.296000+03:00', 3);
ALTER SEQUENCE "Comments_id_seq" RESTART WITH 5;

INSERT INTO "LastLessons"("id", "time", "lessonId", "userId") VALUES
	(2, '2019-08-23 14:59:50.596000+03:00', 10, 1),
	(1, '2019-08-27 08:16:28.755000+03:00', 7, 1);
ALTER SEQUENCE "LastLessons_id_seq" RESTART WITH 2;

INSERT INTO "LastActivities"("id", "info", "time", "type", "userId") VALUES
	(1, null, '2019-08-22 11:05:38.796000+03:00', 'registration', 24),
	(2, null, '2019-08-22 11:54:04.440000+03:00', 'registration', 25),
	(3, null, '2019-08-22 11:55:56.758000+03:00', 'registration', 26),
	(4, null, '2019-08-22 11:57:54.791000+03:00', 'registration', 27),
	(5, 'Lesson 7', '2019-08-23 13:33:21.964000+03:00', 'lesson', 1),
	(6, 'Lesson 7', '2019-08-23 13:47:26.373000+03:00', 'lesson', 1),
	(7, 'Lesson 7', '2019-08-23 13:48:49.912000+03:00', 'lesson', 1),
	(8, 'Lesson 7', '2019-08-23 13:49:36.323000+03:00', 'lesson', 1),
	(9, 'Lesson 7', '2019-08-23 13:49:52.798000+03:00', 'lesson', 1),
	(10, 'Lesson 7', '2019-08-23 13:49:58.763000+03:00', 'lesson', 1),
	(11, 'Lesson 7', '2019-08-23 13:52:11.429000+03:00', 'lesson', 1),
	(12, 'Lesson 7', '2019-08-23 13:52:33.342000+03:00', 'lesson', 1),
	(13, 'Lesson 7', '2019-08-23 13:54:13.830000+03:00', 'lesson', 1),
	(14, 'Lesson10', '2019-08-23 13:54:16.969000+03:00', 'lesson', 1),
	(15, 'Lesson10', '2019-08-23 13:54:57.645000+03:00', 'lesson', 1),
	(16, 'Lesson 7', '2019-08-23 13:55:12.801000+03:00', 'lesson', 1),
	(17, 'Lesson10', '2019-08-23 13:58:16.743000+03:00', 'lesson', 1),
	(18, 'Lesson 7', '2019-08-23 14:59:43.144000+03:00', 'lesson', 1),
	(19, 'Lesson', '2019-08-23 14:59:50.595000+03:00', 'lesson', 1),
	(20, 'Lesson 7', '2019-08-26 11:22:37.090000+03:00', 'lesson', 1),
	(21, 'Lesson 7', '2019-08-26 11:23:33.886000+03:00', 'lesson', 1),
	(22, 'Lesson 7', '2019-08-26 11:23:44.817000+03:00', 'lesson', 1),
	(23, 'Lesson 7', '2019-08-26 11:24:12.190000+03:00', 'lesson', 1),
	(24, 'Lesson 7', '2019-08-26 11:24:23.845000+03:00', 'lesson', 1),
	(25, 'Lesson 7', '2019-08-26 11:24:51.770000+03:00', 'lesson', 1),
	(26, 'Lesson 7', '2019-08-26 11:24:54.782000+03:00', 'lesson', 1),
	(27, 'Lesson 7', '2019-08-26 11:24:57.625000+03:00', 'lesson', 1),
	(28, 'Lesson 7', '2019-08-26 11:25:09.635000+03:00', 'lesson', 1),
	(29, 'Lesson 7', '2019-08-26 11:26:00.124000+03:00', 'lesson', 1),
	(30, 'Lesson 7', '2019-08-26 11:26:28.480000+03:00', 'lesson', 1),
	(31, 'Lesson 7', '2019-08-26 11:26:43.816000+03:00', 'lesson', 1),
	(32, 'Lesson 7', '2019-08-26 11:26:57.767000+03:00', 'lesson', 1),
	(33, 'Lesson 7', '2019-08-26 11:27:21.907000+03:00', 'lesson', 1),
	(34, 'Lesson 7', '2019-08-26 11:27:39.911000+03:00', 'lesson', 1),
	(35, 'Lesson 7', '2019-08-26 11:28:04.622000+03:00', 'lesson', 1),
	(36, 'Lesson 7', '2019-08-26 11:28:15.537000+03:00', 'lesson', 1),
	(37, 'Lesson 7', '2019-08-26 11:28:38.287000+03:00', 'lesson', 1),
	(38, 'Lesson 7', '2019-08-26 11:28:59.010000+03:00', 'lesson', 1),
	(39, 'Lesson 7', '2019-08-26 11:29:06.164000+03:00', 'lesson', 1),
	(40, 'Lesson 7', '2019-08-26 11:29:30.732000+03:00', 'lesson', 1),
	(41, 'Lesson 7', '2019-08-26 11:29:36.731000+03:00', 'lesson', 1),
	(42, 'Lesson 7', '2019-08-26 11:29:40.101000+03:00', 'lesson', 1),
	(43, 'Lesson 7', '2019-08-26 11:29:43.358000+03:00', 'lesson', 1),
	(44, 'Lesson 7', '2019-08-26 11:30:22.400000+03:00', 'lesson', 1),
	(45, 'Lesson 7', '2019-08-26 11:30:30.155000+03:00', 'lesson', 1),
	(46, 'Lesson 7', '2019-08-26 11:30:33.323000+03:00', 'lesson', 1),
	(47, 'Lesson 7', '2019-08-26 11:30:38.827000+03:00', 'lesson', 1),
	(48, 'Lesson 7', '2019-08-26 11:30:48.357000+03:00', 'lesson', 1),
	(49, 'Lesson 7', '2019-08-26 11:31:07.499000+03:00', 'lesson', 1),
	(50, 'Lesson 7', '2019-08-26 11:31:39.203000+03:00', 'lesson', 1),
	(51, 'Lesson 7', '2019-08-26 11:32:07.087000+03:00', 'lesson', 1),
	(52, 'Lesson 7', '2019-08-26 11:32:54.632000+03:00', 'lesson', 1),
	(53, 'Lesson 7', '2019-08-26 11:33:14.693000+03:00', 'lesson', 1),
	(54, 'Lesson 7', '2019-08-26 11:33:30.618000+03:00', 'lesson', 1),
	(55, 'Lesson 7', '2019-08-26 11:33:49.554000+03:00', 'lesson', 1),
	(56, 'Lesson 7', '2019-08-26 11:34:15.529000+03:00', 'lesson', 1),
	(57, 'Lesson 7', '2019-08-26 11:34:54.336000+03:00', 'lesson', 1),
	(58, 'Lesson 7', '2019-08-26 11:35:01.405000+03:00', 'lesson', 1),
	(59, 'Lesson 7', '2019-08-26 11:35:30.726000+03:00', 'lesson', 1),
	(60, 'Lesson 7', '2019-08-26 11:35:42.653000+03:00', 'lesson', 1),
	(61, 'Lesson 7', '2019-08-26 11:36:00.371000+03:00', 'lesson', 1),
	(62, 'Lesson 7', '2019-08-26 11:36:18.782000+03:00', 'lesson', 1),
	(63, 'Lesson 7', '2019-08-26 11:36:43.188000+03:00', 'lesson', 1),
	(64, 'Lesson 7', '2019-08-26 11:36:51.992000+03:00', 'lesson', 1),
	(65, 'Lesson 7', '2019-08-26 11:37:20.102000+03:00', 'lesson', 1),
	(66, 'Lesson 7', '2019-08-26 11:37:22.714000+03:00', 'lesson', 1),
	(67, 'Lesson 7', '2019-08-26 11:37:44.888000+03:00', 'lesson', 1),
	(68, 'Lesson 7', '2019-08-26 11:38:51.574000+03:00', 'lesson', 1),
	(69, 'Lesson 7', '2019-08-26 11:39:03.302000+03:00', 'lesson', 1),
	(70, 'Lesson 7', '2019-08-26 11:54:04.201000+03:00', 'lesson', 1),
	(71, 'Lesson 7', '2019-08-26 11:55:03.250000+03:00', 'lesson', 1),
	(72, 'Lesson 7', '2019-08-26 11:55:45.709000+03:00', 'lesson', 1),
	(73, 'Lesson 7', '2019-08-26 11:55:52.307000+03:00', 'lesson', 1),
	(74, 'Lesson 7', '2019-08-26 11:56:17.413000+03:00', 'lesson', 1),
	(75, 'Lesson 7', '2019-08-26 11:56:26.153000+03:00', 'lesson', 1),
	(76, 'Lesson 7', '2019-08-26 11:56:59.354000+03:00', 'lesson', 1),
	(77, 'Lesson 7', '2019-08-26 11:57:26.093000+03:00', 'lesson', 1),
	(78, 'Lesson 7', '2019-08-26 11:57:29.604000+03:00', 'lesson', 1),
	(79, 'Lesson 7', '2019-08-26 11:57:47.916000+03:00', 'lesson', 1),
	(80, 'Lesson 7', '2019-08-26 11:58:28.787000+03:00', 'lesson', 1),
	(81, 'Lesson 7', '2019-08-26 11:58:43.808000+03:00', 'lesson', 1),
	(82, 'Lesson 7', '2019-08-26 11:59:42.682000+03:00', 'lesson', 1),
	(83, 'Lesson 7', '2019-08-26 11:59:59.556000+03:00', 'lesson', 1),
	(84, 'Lesson 7', '2019-08-26 12:00:26.831000+03:00', 'lesson', 1),
	(85, 'Lesson 7', '2019-08-26 12:00:42.143000+03:00', 'lesson', 1),
	(86, 'Lesson 7', '2019-08-26 12:01:36.746000+03:00', 'lesson', 1),
	(87, 'Lesson 7', '2019-08-26 12:02:04.981000+03:00', 'lesson', 1),
	(88, 'Lesson 7', '2019-08-26 12:02:26.084000+03:00', 'lesson', 1),
	(89, 'Lesson 7', '2019-08-26 12:02:46.529000+03:00', 'lesson', 1),
	(90, 'Lesson 7', '2019-08-26 12:03:20.939000+03:00', 'lesson', 1),
	(91, 'Lesson 7', '2019-08-26 12:03:42.386000+03:00', 'lesson', 1),
	(92, 'Lesson 7', '2019-08-26 12:03:56.994000+03:00', 'lesson', 1),
	(93, 'Lesson 7', '2019-08-26 12:04:40.984000+03:00', 'lesson', 1),
	(94, 'Lesson 7', '2019-08-26 12:05:08.264000+03:00', 'lesson', 1),
	(95, 'Lesson 7', '2019-08-26 12:05:26.823000+03:00', 'lesson', 1),
	(96, 'Lesson 7', '2019-08-26 12:05:39.784000+03:00', 'lesson', 1),
	(97, 'Lesson 7', '2019-08-26 12:05:53.440000+03:00', 'lesson', 1),
	(98, 'Lesson 7', '2019-08-26 12:06:15.132000+03:00', 'lesson', 1),
	(99, 'Lesson 7', '2019-08-26 12:06:48.706000+03:00', 'lesson', 1),
	(100, 'Lesson 7', '2019-08-26 12:07:03.353000+03:00', 'lesson', 1),
	(101, 'Lesson 7', '2019-08-26 12:07:13.781000+03:00', 'lesson', 1),
	(102, 'Lesson 7', '2019-08-26 12:07:18.604000+03:00', 'lesson', 1),
	(103, 'Lesson 7', '2019-08-26 12:07:22.172000+03:00', 'lesson', 1),
	(104, 'Lesson 7', '2019-08-26 12:07:37.351000+03:00', 'lesson', 1),
	(105, 'Lesson 7', '2019-08-26 12:07:43.031000+03:00', 'lesson', 1),
	(106, 'Lesson 7', '2019-08-26 12:07:56.548000+03:00', 'lesson', 1),
	(107, 'Lesson 7', '2019-08-26 12:08:33.907000+03:00', 'lesson', 1),
	(108, 'Lesson 7', '2019-08-26 12:08:43.403000+03:00', 'lesson', 1),
	(109, 'Lesson 7', '2019-08-26 12:09:24.483000+03:00', 'lesson', 1),
	(110, 'Lesson 7', '2019-08-26 12:09:40.538000+03:00', 'lesson', 1),
	(111, 'Lesson 7', '2019-08-26 12:10:04.816000+03:00', 'lesson', 1),
	(112, 'Lesson 7', '2019-08-26 12:10:13.807000+03:00', 'lesson', 1),
	(113, 'Lesson 7', '2019-08-26 12:10:23.758000+03:00', 'lesson', 1),
	(114, 'Lesson 7', '2019-08-26 12:10:46.601000+03:00', 'lesson', 1),
	(115, 'Lesson 7', '2019-08-26 12:11:33.036000+03:00', 'lesson', 1),
	(116, 'Lesson 7', '2019-08-26 12:11:41.637000+03:00', 'lesson', 1),
	(117, 'Lesson 7', '2019-08-26 12:11:52.838000+03:00', 'lesson', 1),
	(118, 'Lesson 7', '2019-08-26 12:12:23.852000+03:00', 'lesson', 1),
	(119, 'Lesson 7', '2019-08-26 12:12:27.445000+03:00', 'lesson', 1),
	(120, 'Lesson 7', '2019-08-26 12:12:49.847000+03:00', 'lesson', 1),
	(121, 'Lesson 7', '2019-08-26 12:13:08.769000+03:00', 'lesson', 1),
	(122, 'Lesson 7', '2019-08-26 12:13:15.899000+03:00', 'lesson', 1),
	(123, 'Lesson 7', '2019-08-26 12:13:24.286000+03:00', 'lesson', 1),
	(124, 'Lesson 7', '2019-08-26 12:13:28.819000+03:00', 'lesson', 1),
	(125, 'Lesson 7', '2019-08-26 12:13:34.069000+03:00', 'lesson', 1),
	(126, 'Lesson 7', '2019-08-26 12:13:37.973000+03:00', 'lesson', 1),
	(127, 'Lesson 7', '2019-08-26 12:13:42.461000+03:00', 'lesson', 1),
	(128, 'Lesson 7', '2019-08-26 12:13:43.984000+03:00', 'lesson', 1),
	(129, 'Lesson 7', '2019-08-26 12:13:46.580000+03:00', 'lesson', 1),
	(130, 'Lesson 7', '2019-08-26 12:13:51.421000+03:00', 'lesson', 1),
	(131, 'Lesson 7', '2019-08-26 12:14:08.655000+03:00', 'lesson', 1),
	(132, 'Lesson 7', '2019-08-26 12:14:13.728000+03:00', 'lesson', 1),
	(133, 'Lesson 7', '2019-08-26 12:20:01.262000+03:00', 'lesson', 1),
	(134, 'Lesson 7', '2019-08-26 12:20:11.178000+03:00', 'lesson', 1),
	(135, 'Lesson 7', '2019-08-26 12:20:19.341000+03:00', 'lesson', 1),
	(136, 'Lesson 7', '2019-08-26 12:20:21.768000+03:00', 'lesson', 1),
	(137, null, '2019-08-26 12:28:14.916000+03:00', 'registration', 28),
	(138, 'Lesson 7', '2019-08-27 08:16:28.754000+03:00', 'lesson', 1);
ALTER SEQUENCE "LastActivities_id_seq" RESTART WITH 139;

INSERT INTO "Replies"("id", "content", "like", "dislike", "date", "userId", "commentId") VALUES
	(1, 'hello112', 0, 0, '2019-08-21 11:00:57.368000+03:00', 1, 1),
	(2, 'hello112', 0, 0, '2019-08-21 11:01:05.201000+03:00', 1, 1),
	(3, 'hello112', 0, 0, '2019-08-21 11:15:52.071000+03:00', 1, 1),
	(4, 'hello112ewfw', 0, 0, '2019-08-21 11:15:57.723000+03:00', 1, 1),
	(5, 'hello112ewfw', 0, 0, '2019-08-21 11:16:58.530000+03:00', 1, 1),
	(10, 'qweqwe', 2, 0, '2019-08-21 14:12:32.413000+03:00', 3, 2),
	(8, 'asdasd', 0, 0, '2019-08-21 13:59:08.937000+03:00', 3, 2),
	(6, 'hello112ewfw', 1, 0, '2019-08-21 11:17:38.114000+03:00', 1, 2),
	(27, 'qwe', 1, 0, '2019-08-27 14:45:09.034000+03:00', 27, 10),
	(28, 'asd', 0, 0, '2019-08-29 10:26:52.223000+03:00', 3, 10),
	(12, 'asd', 1, 0, '2019-08-21 14:16:26.215000+03:00', 3, 4),
	(13, 'qwe', 1, 0, '2019-08-26 12:38:52.719000+03:00', 28, 6),
	(14, 'asd', 0, 0, '2019-08-26 12:39:30.686000+03:00', 28, 4),
	(15, 'qweqwe', 0, 0, '2019-08-26 12:40:43.121000+03:00', 28, 4),
	(22, 'asdasd', 0, 0, '2019-08-26 12:54:41.234000+03:00', 28, 5),
	(23, 'asdasd', 0, 0, '2019-08-26 12:55:20.827000+03:00', 28, 5),
	(21, 'zhan', 1, 0, '2019-08-26 12:53:12.637000+03:00', 28, 6),
	(25, 'qw', 1, 0, '2019-08-26 12:56:34.537000+03:00', 28, 8),
	(24, 'qwe', 2, 0, '2019-08-26 12:56:28.204000+03:00', 28, 8),
	(26, 'asd', 0, 0, '2019-08-27 13:28:56.952000+03:00', 27, 4),
	(11, 'asd', 2, 0, '2019-08-21 14:15:01.920000+03:00', 3, 4),
	(16, 'asd', 0, 0, '2019-08-26 12:49:09.497000+03:00', 28, 2),
	(9, 'asd', 2, 0, '2019-08-21 14:12:24.835000+03:00', 3, 2),
	(7, 'hello112ewfw', 2, 0, '2019-08-21 11:17:52.227000+03:00', 1, 2);
ALTER SEQUENCE "Replies_id_seq" RESTART WITH 8;

INSERT INTO "Likes"("id", "type", "commentId", "userId", "replyId") VALUES
	(270, 'like', null, 3, 10),
	(272, 'like', 3, 3, null),
	(274, 'like', 4, 3, null),
	(275, 'like', null, 3, 27),
	(217, 'like', 2, 8, null),
	(222, 'like', 2, 27, null),
	(229, 'like', null, 28, 9),
	(230, 'like', null, 28, 12),
	(231, 'like', null, 28, 11),
	(232, 'like', null, 28, 7),
	(233, 'like', null, 28, 6),
	(234, 'like', null, 28, 10),
	(236, 'like', 6, 28, null),
	(237, 'like', null, 28, 13),
	(238, 'like', 2, 28, null),
	(239, 'like', 5, 28, null),
	(240, 'like', null, 28, 21),
	(242, 'like', null, 28, 24),
	(243, 'like', 8, 28, null),
	(245, 'like', 8, 27, null),
	(246, 'like', null, 27, 25),
	(247, 'like', null, 27, 24),
	(249, 'like', 6, 27, null),
	(250, 'like', 10, 27, null),
	(251, 'like', 3, 27, null),
	(252, 'like', 7, 3, null),
	(257, 'like', 2, 3, null),
	(260, 'like', null, 3, 11),
	(261, 'like', 6, 3, null),
	(267, 'like', null, 3, 9),
	(268, 'like', null, 3, 7);
ALTER SEQUENCE "Likes_id_seq" RESTART WITH 269;

INSERT INTO "Help"("id", "TaskName", "description", "time", "taskId", "userId") VALUES
	(1, 'Task8 for Lesson8', 'asdasd', '2019-08-27 08:35:32.721000+03:00', null, 27);
ALTER SEQUENCE "Help_id_seq" RESTART WITH 2;



INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (26, 'Men', 'maduan@gmail.com', '$2a$10$GKb68BtiM5sXPDXFnrh.seK7goov2mHnhczlfmtfHgO5JeFrekhtS', 'admin', '//www.gravatar.com/avatar/b23b57d8d5267a54bd3a4d833719b6f8?s=200&r=pg&d=mm', 1, '2020-08-11 12:55:12.824+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (15, 'Еска Саринов', 'eskasarinov@gmail.com', '$2a$10$LgT5jgVwV55Lq2VQ.LWR7Oik6B/Y2GzPKf0MfUgyqzX2BArj8eaai', 'admin', '//www.gravatar.com/avatar/64af7270cd49e4fc7d0b4baa83f78256?s=200&r=pg&d=mm', 1, '2020-08-05 22:57:51.023+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (16, 'test10', 'test10@gmail.com', '$2a$10$OX7zZ7G8qRrKq6KP4nnmGOsUV1U6h6Pc.qwO8Q1nnKJFLsR4EOlBy', 'admin', '//www.gravatar.com/avatar/8ee876f29b6851bf9053530a191b5167?s=200&r=pg&d=mm', 1, '2020-08-05 23:03:39.379+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (17, 'Асыл Гапуров', 'assgprv@gmail.com', '$2a$10$2hBBLm2a6CWZM/FyOXe/rOiZNv4lfaCH3CQNww17tEn7z37Xtfera', 'admin', '//www.gravatar.com/avatar/f78b7e96cc65aa17ea7da9ffa088caa9?s=200&r=pg&d=mm', 1, '2020-08-05 23:03:44.118+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (18, 'Парасат Талап', 'parasat@gmail.com', '$2a$10$kCmszyoT4iRQQrD.R2zdaOB4o8HXvMFF2wRemghW5S1knNUHH7TSm', 'admin', '//www.gravatar.com/avatar/ac02640efd266b3d63891472bbca0f03?s=200&r=pg&d=mm', 1, '2020-08-05 23:18:35.621+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (19, 'Yedil Akhmetkarimov', 'akhmetkarimov.yedil@gmail.com', '$2a$10$oSBNw2gXuj.nSHvSLwI58OOD7TU46fjn5LB/OA0ifK.t9hL.4VIhm', 'admin', '//www.gravatar.com/avatar/fce90ee44f9e2109c5413c8d2f4f5677?s=200&r=pg&d=mm', 1, '2020-08-06 15:29:08.315+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (20, 'Аймаганбетов Рахимжан', 'rz.aimaganbetov@gmail.com', '$2a$10$zfDhAGmTIoMLtec3.ApwJuRgxRcfchIDWSpQuxI1mZjcWEgCZ8AMO', 'admin', '//www.gravatar.com/avatar/fd498c6016144a42da0ad8a7f092e8a4?s=200&r=pg&d=mm', 1, '2020-08-06 15:49:43.168+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (10, 'Maiira', 'maira@mail.ru', '$2a$10$/CwSNsktTTsAmSxeUJ4gzuSxy2pgarOm0akMuphqQ05B1B09f9LzK', 'user', '//www.gravatar.com/avatar/fbb838d2f1f529bd90611a5128bf5e8d?s=200&r=pg&d=mm', 4, '2020-05-26 10:46:16.301+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (27, 'Diana', 'maduandiana@gmail.com', '$2a$10$10/T5oGQX6r/y0nrQOU5/.0KXSElmC6Wt.4B7pCOk3ZQJ9x14aEzy', 'admin', '//www.gravatar.com/avatar/b23b57d8d5267a54bd3a4d833719b6f8?s=200&r=pg&d=mm', 1, '2020-08-11 12:59:22.34+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (28, 'Barat', 'b@mail.ru', '$2a$10$jDQ5C0vBBOJULujsoJmfXe7rRWYGl9WlOdyMN1qgZv7Z7x2YGJP4.', 'admin', '//www.gravatar.com/avatar/4c1adde945045cbfc9e12c995ae4bf97?s=200&r=pg&d=mm', 1, '2020-08-16 20:58:46.788+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (29, 'Майра Барат', 'm@mail.ru', '$2a$10$iw62.kW0/gqCY/AZSJ7NZeFcIpaqEox0ax/ZKApXT7TD8ttSRgHe.', 'admin', '//www.gravatar.com/avatar/4aeca8cea0150aa1d9fecdb8da5f521c?s=200&r=pg&d=mm', 1, '2020-08-16 21:44:41.323+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (25, 'ddd', 'user@gmail.com', '$2a$10$4TWkL6UV.Q7RvV4gFkFL2e3oIhpkl/pDhCUK8qKkE2kbuYa8I5RA6', 'admin', '//www.gravatar.com/avatar/b23b57d8d5267a54bd3a4d833719b6f8?s=200&r=pg&d=mm', 1, '2020-08-11 06:07:47.241+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (14, 'Жанерке Шайкасым', 'zhanerkeshaikasym@gmail.com', '$2a$10$OBHcFlqwcB/EMr/5NR9s7ej5/LWSf05AfeOo4YFntI/6aYahBmS/i', 'admin', '//www.gravatar.com/avatar/c38125490562b691739211e668b69d91?s=200&r=pg&d=mm', 4, '2020-08-05 22:25:23.175+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (11, 'Diana', 'm@mail.com', '$2a$10$WgH/yezPHadH52wB4AEI8Of66sKP3qCIkXXI0CzVHX2/0L19pe1A6', 'user', '//www.gravatar.com/avatar/6bf1c3e37665abb9a1e0e3f81796c87c?s=200&r=pg&d=mm', 5, '2020-05-28 19:55:17.413+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (23, 'Жанерке Шайкасым', 'zhaneka2@gmail.com', '$2a$10$JHVm0UXTQ1AT1cuFZTLJyOoll5UGWDj1pN4buUGgo2/FSIYAXfvRi', 'admin', '//www.gravatar.com/avatar/eb88937a6da8ab7603789685b5ba1acd?s=200&r=pg&d=mm', 1, '2020-08-10 15:15:48.669+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (22, 'Yelnur Seitzhanov', 'seitzhanov1211@gmail.com', '$2a$10$5J2i.hXYvkbwDNkwjULuhe/BlqHUdUC9NIh.XoP1k9YLX9UMQLXSG', 'admin', '//www.gravatar.com/avatar/9546dafcaef596d7045949e9f02df221?s=200&r=pg&d=mm', 1, '2020-08-07 08:08:52.051+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (6, 'Zhanerke', 'zhaneka@gmail.com', '$2a$10$uaseTfTfxA46f/w3GIs8keQg6.LLEqYFOOcpvHj8Rii9b8z5DCTIW', 'user', '//www.gravatar.com/avatar/d8fa45dc509b3fd19dca8b043806f3fd?s=200&r=pg&d=mm', 1, '2020-04-29 15:01:52.517+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (7, 'Керимкулов Алибек', 'kerimkulov.ali@mail.ru', '$2a$10$n//st.9MXNpWYPEFH0BPgObvPy5opyAB2fg4/UXUDYH4hn87Ks0Ha', 'user', '//www.gravatar.com/avatar/4b8a3d1be35ddb154b6fefc458472a17?s=200&r=pg&d=mm', 1, '2020-04-30 22:38:05.15+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (8, 'Barat Maira', 'mairabarat@gmail.com', '$2a$10$16kgCgksYcyMoadcS8UlJ.q9auOmRaNb3wjkFzNAirxP3wDBWEc52', 'user', '//www.gravatar.com/avatar/bfe6af30702938170fb1cb8409f9be36?s=200&r=pg&d=mm', 1, '2020-05-03 10:49:57.574+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (9, 'Limton Yeldar', 'limtonoveldar@gmail.com', '$2a$10$nGsE13PaE4viXCZWebZCwOj/g4nQQkO8up/EkaSWtbmgZLM6qsba6', 'user', '//www.gravatar.com/avatar/c90ec50f0c064bbb8b531cd71248ff7e?s=200&r=pg&d=mm', 1, '2020-05-22 09:13:07.331+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (12, 'diana', 'diana@gmail.com', '$2a$10$30az8IXugSjoYuUNA79AfOus4qWcMYrS2kS8jFUkiRiXdJYDj9IXy', 'user', '//www.gravatar.com/avatar/9cb6454d2428a2d6a6b15994fdbfa4e4?s=200&r=pg&d=mm', 1, '2020-06-04 13:16:25.397+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (13, 'user', 'user@gmail.com', '$2a$10$OEzGs7NHSLqO5yZuHGKemOMwXKXR4Y6TNA9FfhqYlURapqJig8B.u', 'admin', '//www.gravatar.com/avatar/cba1f2d695a5ca39ee6f343297a761a4?s=200&r=pg&d=mm', 1, '2020-06-11 07:08:53.028+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (5, 'admin', 'admin@admin.com', '$2a$10$13gS0zPC87orYCAOu6Qtc.XOwfZtji1BKawKpAU.26IaQHGKufxDK', 'admin', 'http://jsrush.decode.kz:5001/profileimage/admin1586324566854.svg', 1, '2020-04-07 20:11:39.538+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (21, 'Diana Maduan', 'maduandiana11@gmail.com', '$2a$10$njDLq3jnHf.2lxGDPvLCzuA.9TZ32qvMJSXzXYCnBTBqrUwryrmHe', 'admin', '//www.gravatar.com/avatar/b23b57d8d5267a54bd3a4d833719b6f8?s=200&r=pg&d=mm', 4, '2020-08-07 07:42:57.826+03');
INSERT INTO public."Users" (id, name, email, password, role, avatar, "statusId", date) VALUES (24, 'user', 'user@gmail.com', '$2a$10$KpLTNuC68D6C.kcIrOb1DeYpYiIoI3n5Cpy9qFCMJ8s25tCG4.LcG', 'admin', '//www.gravatar.com/avatar/b23b57d8d5267a54bd3a4d833719b6f8?s=200&r=pg&d=mm', 1, '2020-08-11 05:47:25.429+03');
