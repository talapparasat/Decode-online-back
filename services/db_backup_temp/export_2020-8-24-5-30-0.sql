--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.19
-- Dumped by pg_dump version 9.6.19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: enum_LastActivities_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_LastActivities_type" AS ENUM (
    'lesson',
    'task',
    'registration',
    'newLevel'
);


ALTER TYPE public."enum_LastActivities_type" OWNER TO postgres;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public."enum_Users_role" OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: CommentTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CommentTypes" (
    id integer NOT NULL,
    "commentId" integer,
    type character varying(255),
    "typeId" integer
);


ALTER TABLE public."CommentTypes" OWNER TO postgres;

--
-- Name: CommentTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CommentTypes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CommentTypes_id_seq" OWNER TO postgres;

--
-- Name: CommentTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CommentTypes_id_seq" OWNED BY public."CommentTypes".id;


--
-- Name: Comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comments" (
    id integer NOT NULL,
    content text,
    "like" integer DEFAULT 0,
    dislike integer DEFAULT 0,
    date timestamp with time zone,
    "userId" integer
);


ALTER TABLE public."Comments" OWNER TO postgres;

--
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comments_id_seq" OWNER TO postgres;

--
-- Name: Comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comments_id_seq" OWNED BY public."Comments".id;


--
-- Name: Courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Courses" (
    id integer NOT NULL,
    name character varying(255),
    description text,
    img character varying(255),
    "order" integer DEFAULT 1
);


ALTER TABLE public."Courses" OWNER TO postgres;

--
-- Name: Courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Courses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Courses_id_seq" OWNER TO postgres;

--
-- Name: Courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Courses_id_seq" OWNED BY public."Courses".id;


--
-- Name: Feedbacks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Feedbacks" (
    id integer NOT NULL,
    feedback text,
    "userId" integer
);


ALTER TABLE public."Feedbacks" OWNER TO postgres;

--
-- Name: Feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Feedbacks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Feedbacks_id_seq" OWNER TO postgres;

--
-- Name: Feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Feedbacks_id_seq" OWNED BY public."Feedbacks".id;


--
-- Name: Friends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Friends" (
    id integer NOT NULL,
    first_user_id integer,
    second_user_id integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Friends" OWNER TO postgres;

--
-- Name: Friends_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Friends_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Friends_id_seq" OWNER TO postgres;

--
-- Name: Friends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Friends_id_seq" OWNED BY public."Friends".id;


--
-- Name: Help; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Help" (
    id integer NOT NULL,
    "TaskName" character varying(255),
    description text,
    "time" timestamp with time zone,
    "taskId" integer,
    "userId" integer
);


ALTER TABLE public."Help" OWNER TO postgres;

--
-- Name: Help_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Help_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Help_id_seq" OWNER TO postgres;

--
-- Name: Help_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Help_id_seq" OWNED BY public."Help".id;


--
-- Name: LastActivities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LastActivities" (
    id integer NOT NULL,
    info character varying(255),
    "time" timestamp with time zone,
    type public."enum_LastActivities_type",
    "userId" integer
);


ALTER TABLE public."LastActivities" OWNER TO postgres;

--
-- Name: LastActivities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LastActivities_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LastActivities_id_seq" OWNER TO postgres;

--
-- Name: LastActivities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LastActivities_id_seq" OWNED BY public."LastActivities".id;


--
-- Name: LastLessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LastLessons" (
    id integer NOT NULL,
    "time" timestamp with time zone,
    "lessonId" integer,
    "userId" integer
);


ALTER TABLE public."LastLessons" OWNER TO postgres;

--
-- Name: LastLessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LastLessons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LastLessons_id_seq" OWNER TO postgres;

--
-- Name: LastLessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LastLessons_id_seq" OWNED BY public."LastLessons".id;


--
-- Name: LastTasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LastTasks" (
    id integer NOT NULL,
    "time" timestamp with time zone,
    "taskId" integer,
    "userId" integer
);


ALTER TABLE public."LastTasks" OWNER TO postgres;

--
-- Name: LastTasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LastTasks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LastTasks_id_seq" OWNER TO postgres;

--
-- Name: LastTasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LastTasks_id_seq" OWNED BY public."LastTasks".id;


--
-- Name: Lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Lessons" (
    id integer NOT NULL,
    title character varying(255),
    description character varying(255),
    number_of_likes integer DEFAULT 0,
    number_of_dislikes integer DEFAULT 0,
    "order" integer DEFAULT 0,
    short_content text,
    content text,
    "levelId" integer,
    "preLessonId" integer
);


ALTER TABLE public."Lessons" OWNER TO postgres;

--
-- Name: Lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Lessons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Lessons_id_seq" OWNER TO postgres;

--
-- Name: Lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Lessons_id_seq" OWNED BY public."Lessons".id;


--
-- Name: Levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Levels" (
    id integer NOT NULL,
    title character varying(255),
    "order" integer,
    price integer DEFAULT 0,
    "sectionId" integer
);


ALTER TABLE public."Levels" OWNER TO postgres;

--
-- Name: Levels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Levels_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Levels_id_seq" OWNER TO postgres;

--
-- Name: Levels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Levels_id_seq" OWNED BY public."Levels".id;


--
-- Name: Likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Likes" (
    id integer NOT NULL,
    type character varying(255),
    "commentId" integer,
    "userId" integer,
    "replyId" integer
);


ALTER TABLE public."Likes" OWNER TO postgres;

--
-- Name: Likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Likes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Likes_id_seq" OWNER TO postgres;

--
-- Name: Likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Likes_id_seq" OWNED BY public."Likes".id;


--
-- Name: Replies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Replies" (
    id integer NOT NULL,
    content text,
    "like" integer DEFAULT 0,
    dislike integer DEFAULT 0,
    date timestamp with time zone NOT NULL,
    "userId" integer,
    "commentId" integer
);


ALTER TABLE public."Replies" OWNER TO postgres;

--
-- Name: Replies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Replies_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Replies_id_seq" OWNER TO postgres;

--
-- Name: Replies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Replies_id_seq" OWNED BY public."Replies".id;


--
-- Name: SectionPrerequisites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SectionPrerequisites" (
    id integer NOT NULL,
    "preSectionId" integer,
    "postSectionId" integer NOT NULL
);


ALTER TABLE public."SectionPrerequisites" OWNER TO postgres;

--
-- Name: SectionPrerequisites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SectionPrerequisites_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SectionPrerequisites_id_seq" OWNER TO postgres;

--
-- Name: SectionPrerequisites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SectionPrerequisites_id_seq" OWNED BY public."SectionPrerequisites".id;


--
-- Name: Sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sections" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    prerequisite integer DEFAULT 0,
    level_count integer DEFAULT 0,
    img character varying(255),
    "order" integer DEFAULT 1,
    "courseId" integer
);


ALTER TABLE public."Sections" OWNER TO postgres;

--
-- Name: Sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Sections_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Sections_id_seq" OWNER TO postgres;

--
-- Name: Sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Sections_id_seq" OWNED BY public."Sections".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Statuses" (
    id integer NOT NULL,
    status character varying(255)
);


ALTER TABLE public."Statuses" OWNER TO postgres;

--
-- Name: Statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Statuses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Statuses_id_seq" OWNER TO postgres;

--
-- Name: Statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Statuses_id_seq" OWNED BY public."Statuses".id;


--
-- Name: Tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tasks" (
    id integer NOT NULL,
    title character varying(255),
    description text,
    requirements text,
    content text,
    solution text,
    chakra integer,
    "order" integer,
    "lessonId" integer
);


ALTER TABLE public."Tasks" OWNER TO postgres;

--
-- Name: Tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tasks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tasks_id_seq" OWNER TO postgres;

--
-- Name: Tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tasks_id_seq" OWNED BY public."Tasks".id;


--
-- Name: UserCourses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserCourses" (
    id integer NOT NULL,
    chakra integer DEFAULT 0,
    "courseId" integer,
    "userId" integer
);


ALTER TABLE public."UserCourses" OWNER TO postgres;

--
-- Name: UserCourses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserCourses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserCourses_id_seq" OWNER TO postgres;

--
-- Name: UserCourses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserCourses_id_seq" OWNED BY public."UserCourses".id;


--
-- Name: UserLevels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserLevels" (
    id integer NOT NULL,
    level integer DEFAULT 1 NOT NULL,
    "sectionId" integer,
    "userId" integer
);


ALTER TABLE public."UserLevels" OWNER TO postgres;

--
-- Name: UserLevels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserLevels_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserLevels_id_seq" OWNER TO postgres;

--
-- Name: UserLevels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserLevels_id_seq" OWNED BY public."UserLevels".id;


--
-- Name: UserTasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserTasks" (
    id integer NOT NULL,
    solution text,
    date timestamp with time zone,
    "taskId" integer,
    "userId" integer
);


ALTER TABLE public."UserTasks" OWNER TO postgres;

--
-- Name: UserTasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserTasks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserTasks_id_seq" OWNER TO postgres;

--
-- Name: UserTasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserTasks_id_seq" OWNED BY public."UserTasks".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    role public."enum_Users_role" DEFAULT 'user'::public."enum_Users_role",
    avatar character varying(255),
    "statusId" integer DEFAULT 1,
    date timestamp with time zone
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: CommentTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CommentTypes" ALTER COLUMN id SET DEFAULT nextval('public."CommentTypes_id_seq"'::regclass);


--
-- Name: Comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments" ALTER COLUMN id SET DEFAULT nextval('public."Comments_id_seq"'::regclass);


--
-- Name: Courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses" ALTER COLUMN id SET DEFAULT nextval('public."Courses_id_seq"'::regclass);


--
-- Name: Feedbacks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks" ALTER COLUMN id SET DEFAULT nextval('public."Feedbacks_id_seq"'::regclass);


--
-- Name: Friends id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friends" ALTER COLUMN id SET DEFAULT nextval('public."Friends_id_seq"'::regclass);


--
-- Name: Help id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Help" ALTER COLUMN id SET DEFAULT nextval('public."Help_id_seq"'::regclass);


--
-- Name: LastActivities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastActivities" ALTER COLUMN id SET DEFAULT nextval('public."LastActivities_id_seq"'::regclass);


--
-- Name: LastLessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastLessons" ALTER COLUMN id SET DEFAULT nextval('public."LastLessons_id_seq"'::regclass);


--
-- Name: LastTasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastTasks" ALTER COLUMN id SET DEFAULT nextval('public."LastTasks_id_seq"'::regclass);


--
-- Name: Lessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lessons" ALTER COLUMN id SET DEFAULT nextval('public."Lessons_id_seq"'::regclass);


--
-- Name: Levels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Levels" ALTER COLUMN id SET DEFAULT nextval('public."Levels_id_seq"'::regclass);


--
-- Name: Likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes" ALTER COLUMN id SET DEFAULT nextval('public."Likes_id_seq"'::regclass);


--
-- Name: Replies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Replies" ALTER COLUMN id SET DEFAULT nextval('public."Replies_id_seq"'::regclass);


--
-- Name: SectionPrerequisites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SectionPrerequisites" ALTER COLUMN id SET DEFAULT nextval('public."SectionPrerequisites_id_seq"'::regclass);


--
-- Name: Sections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sections" ALTER COLUMN id SET DEFAULT nextval('public."Sections_id_seq"'::regclass);


--
-- Name: Statuses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Statuses" ALTER COLUMN id SET DEFAULT nextval('public."Statuses_id_seq"'::regclass);


--
-- Name: Tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tasks" ALTER COLUMN id SET DEFAULT nextval('public."Tasks_id_seq"'::regclass);


--
-- Name: UserCourses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses" ALTER COLUMN id SET DEFAULT nextval('public."UserCourses_id_seq"'::regclass);


--
-- Name: UserLevels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLevels" ALTER COLUMN id SET DEFAULT nextval('public."UserLevels_id_seq"'::regclass);


--
-- Name: UserTasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserTasks" ALTER COLUMN id SET DEFAULT nextval('public."UserTasks_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: CommentTypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CommentTypes" (id, "commentId", type, "typeId") FROM stdin;
\.


--
-- Name: CommentTypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CommentTypes_id_seq"', 1, false);


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comments" (id, content, "like", dislike, date, "userId") FROM stdin;
\.


--
-- Name: Comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comments_id_seq"', 1, false);


--
-- Data for Name: Courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Courses" (id, name, description, img, "order") FROM stdin;
\.


--
-- Name: Courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Courses_id_seq"', 1, false);


--
-- Data for Name: Feedbacks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Feedbacks" (id, feedback, "userId") FROM stdin;
\.


--
-- Name: Feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Feedbacks_id_seq"', 1, false);


--
-- Data for Name: Friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Friends" (id, first_user_id, second_user_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: Friends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Friends_id_seq"', 1, false);


--
-- Data for Name: Help; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Help" (id, "TaskName", description, "time", "taskId", "userId") FROM stdin;
\.


--
-- Name: Help_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Help_id_seq"', 1, false);


--
-- Data for Name: LastActivities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LastActivities" (id, info, "time", type, "userId") FROM stdin;
\.


--
-- Name: LastActivities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LastActivities_id_seq"', 1, false);


--
-- Data for Name: LastLessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LastLessons" (id, "time", "lessonId", "userId") FROM stdin;
\.


--
-- Name: LastLessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LastLessons_id_seq"', 1, false);


--
-- Data for Name: LastTasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LastTasks" (id, "time", "taskId", "userId") FROM stdin;
\.


--
-- Name: LastTasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LastTasks_id_seq"', 1, false);


--
-- Data for Name: Lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Lessons" (id, title, description, number_of_likes, number_of_dislikes, "order", short_content, content, "levelId", "preLessonId") FROM stdin;
\.


--
-- Name: Lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Lessons_id_seq"', 1, false);


--
-- Data for Name: Levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Levels" (id, title, "order", price, "sectionId") FROM stdin;
\.


--
-- Name: Levels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Levels_id_seq"', 1, false);


--
-- Data for Name: Likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Likes" (id, type, "commentId", "userId", "replyId") FROM stdin;
\.


--
-- Name: Likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Likes_id_seq"', 1, false);


--
-- Data for Name: Replies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Replies" (id, content, "like", dislike, date, "userId", "commentId") FROM stdin;
\.


--
-- Name: Replies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Replies_id_seq"', 1, false);


--
-- Data for Name: SectionPrerequisites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SectionPrerequisites" (id, "preSectionId", "postSectionId") FROM stdin;
\.


--
-- Name: SectionPrerequisites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SectionPrerequisites_id_seq"', 1, false);


--
-- Data for Name: Sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sections" (id, name, description, prerequisite, level_count, img, "order", "courseId") FROM stdin;
\.


--
-- Name: Sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Sections_id_seq"', 1, false);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20190515094623-create-status.js
20190515094725-create-user.js
20190515094736-create-course.js
20190515094854-create-section.js
20190515094855-create-section-prerequisites.js
20190515095004-create-user-level.js
20190515095031-create-level.js
20190516080929-create-comment.js
20190516080929-create-friends.js
20190516080930-create-comment-type.js
20190516082046-create-lessons.js
20190523100942-create-user-course.js
20190523101940-create-task.js
20190523101941-create-user-task.js
20190528065934-create-last-lesson.js
20190530082316-create-last-task.js
20190530095405-create-last-activity.js
20190725080618-create-reply.js
20190725080619-create-likes.js
20190729090731-create-help.js
20190730061003-create-feedback.js
\.


--
-- Data for Name: Statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Statuses" (id, status) FROM stdin;
\.


--
-- Name: Statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Statuses_id_seq"', 1, false);


--
-- Data for Name: Tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tasks" (id, title, description, requirements, content, solution, chakra, "order", "lessonId") FROM stdin;
\.


--
-- Name: Tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tasks_id_seq"', 1, false);


--
-- Data for Name: UserCourses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserCourses" (id, chakra, "courseId", "userId") FROM stdin;
\.


--
-- Name: UserCourses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserCourses_id_seq"', 1, false);


--
-- Data for Name: UserLevels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserLevels" (id, level, "sectionId", "userId") FROM stdin;
\.


--
-- Name: UserLevels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserLevels_id_seq"', 1, false);


--
-- Data for Name: UserTasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserTasks" (id, solution, date, "taskId", "userId") FROM stdin;
\.


--
-- Name: UserTasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserTasks_id_seq"', 1, false);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, email, password, role, avatar, "statusId", date) FROM stdin;
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);


--
-- Name: CommentTypes CommentTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CommentTypes"
    ADD CONSTRAINT "CommentTypes_pkey" PRIMARY KEY (id);


--
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: Courses Courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Courses"
    ADD CONSTRAINT "Courses_pkey" PRIMARY KEY (id);


--
-- Name: Feedbacks Feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks"
    ADD CONSTRAINT "Feedbacks_pkey" PRIMARY KEY (id);


--
-- Name: Friends Friends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Friends"
    ADD CONSTRAINT "Friends_pkey" PRIMARY KEY (id);


--
-- Name: Help Help_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Help"
    ADD CONSTRAINT "Help_pkey" PRIMARY KEY (id);


--
-- Name: LastActivities LastActivities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastActivities"
    ADD CONSTRAINT "LastActivities_pkey" PRIMARY KEY (id);


--
-- Name: LastLessons LastLessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastLessons"
    ADD CONSTRAINT "LastLessons_pkey" PRIMARY KEY (id);


--
-- Name: LastTasks LastTasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastTasks"
    ADD CONSTRAINT "LastTasks_pkey" PRIMARY KEY (id);


--
-- Name: Lessons Lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lessons"
    ADD CONSTRAINT "Lessons_pkey" PRIMARY KEY (id);


--
-- Name: Levels Levels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Levels"
    ADD CONSTRAINT "Levels_pkey" PRIMARY KEY (id);


--
-- Name: Likes Likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY (id);


--
-- Name: Replies Replies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Replies"
    ADD CONSTRAINT "Replies_pkey" PRIMARY KEY (id);


--
-- Name: SectionPrerequisites SectionPrerequisites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SectionPrerequisites"
    ADD CONSTRAINT "SectionPrerequisites_pkey" PRIMARY KEY (id);


--
-- Name: Sections Sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sections"
    ADD CONSTRAINT "Sections_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Statuses Statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Statuses"
    ADD CONSTRAINT "Statuses_pkey" PRIMARY KEY (id);


--
-- Name: Tasks Tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_pkey" PRIMARY KEY (id);


--
-- Name: UserCourses UserCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_pkey" PRIMARY KEY (id);


--
-- Name: UserLevels UserLevels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLevels"
    ADD CONSTRAINT "UserLevels_pkey" PRIMARY KEY (id);


--
-- Name: UserTasks UserTasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserTasks"
    ADD CONSTRAINT "UserTasks_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: CommentTypes CommentTypes_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CommentTypes"
    ADD CONSTRAINT "CommentTypes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comments"(id) ON DELETE CASCADE;


--
-- Name: Comments Comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Feedbacks Feedbacks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedbacks"
    ADD CONSTRAINT "Feedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Help Help_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Help"
    ADD CONSTRAINT "Help_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Tasks"(id) ON DELETE CASCADE;


--
-- Name: Help Help_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Help"
    ADD CONSTRAINT "Help_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: LastActivities LastActivities_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastActivities"
    ADD CONSTRAINT "LastActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: LastLessons LastLessons_lessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastLessons"
    ADD CONSTRAINT "LastLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES public."Lessons"(id) ON DELETE CASCADE;


--
-- Name: LastLessons LastLessons_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastLessons"
    ADD CONSTRAINT "LastLessons_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: LastTasks LastTasks_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastTasks"
    ADD CONSTRAINT "LastTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Tasks"(id) ON DELETE CASCADE;


--
-- Name: LastTasks LastTasks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LastTasks"
    ADD CONSTRAINT "LastTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Lessons Lessons_levelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lessons"
    ADD CONSTRAINT "Lessons_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES public."Levels"(id) ON DELETE CASCADE;


--
-- Name: Lessons Lessons_preLessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Lessons"
    ADD CONSTRAINT "Lessons_preLessonId_fkey" FOREIGN KEY ("preLessonId") REFERENCES public."Lessons"(id) ON DELETE CASCADE;


--
-- Name: Levels Levels_sectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Levels"
    ADD CONSTRAINT "Levels_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES public."Sections"(id) ON DELETE CASCADE;


--
-- Name: Likes Likes_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comments"(id) ON DELETE CASCADE;


--
-- Name: Likes Likes_replyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES public."Replies"(id) ON DELETE CASCADE;


--
-- Name: Likes Likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Likes"
    ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Replies Replies_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Replies"
    ADD CONSTRAINT "Replies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comments"(id) ON DELETE CASCADE;


--
-- Name: Replies Replies_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Replies"
    ADD CONSTRAINT "Replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: SectionPrerequisites SectionPrerequisites_postSectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SectionPrerequisites"
    ADD CONSTRAINT "SectionPrerequisites_postSectionId_fkey" FOREIGN KEY ("postSectionId") REFERENCES public."Sections"(id) ON DELETE CASCADE;


--
-- Name: SectionPrerequisites SectionPrerequisites_preSectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SectionPrerequisites"
    ADD CONSTRAINT "SectionPrerequisites_preSectionId_fkey" FOREIGN KEY ("preSectionId") REFERENCES public."Sections"(id) ON DELETE CASCADE;


--
-- Name: Sections Sections_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sections"
    ADD CONSTRAINT "Sections_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Courses"(id) ON DELETE CASCADE;


--
-- Name: Tasks Tasks_lessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tasks"
    ADD CONSTRAINT "Tasks_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES public."Lessons"(id) ON DELETE CASCADE;


--
-- Name: UserCourses UserCourses_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Courses"(id) ON DELETE CASCADE;


--
-- Name: UserCourses UserCourses_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserCourses"
    ADD CONSTRAINT "UserCourses_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: UserLevels UserLevels_sectionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLevels"
    ADD CONSTRAINT "UserLevels_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES public."Sections"(id) ON DELETE CASCADE;


--
-- Name: UserLevels UserLevels_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserLevels"
    ADD CONSTRAINT "UserLevels_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: UserTasks UserTasks_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserTasks"
    ADD CONSTRAINT "UserTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Tasks"(id) ON DELETE CASCADE;


--
-- Name: UserTasks UserTasks_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserTasks"
    ADD CONSTRAINT "UserTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Users Users_statusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES public."Statuses"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

