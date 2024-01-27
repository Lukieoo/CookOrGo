--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    addressid bigint NOT NULL,
    postal_code character varying(20) NOT NULL,
    city character varying(50) NOT NULL,
    country character varying(50) NOT NULL,
    state character varying(50) NOT NULL,
    street character varying(100) NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: addresses_addressid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_addressid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_addressid_seq OWNER TO postgres;

--
-- Name: addresses_addressid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_addressid_seq OWNED BY public.addresses.addressid;


--
-- Name: category_home; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_home (
    category_homeid bigint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.category_home OWNER TO postgres;

--
-- Name: category_home_category_homeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_home_category_homeid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_home_category_homeid_seq OWNER TO postgres;

--
-- Name: category_home_category_homeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_home_category_homeid_seq OWNED BY public.category_home.category_homeid;


--
-- Name: category_home_home_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_home_home_products (
    category_home_category_homeid bigint NOT NULL,
    home_products_home_productid bigint NOT NULL
);


ALTER TABLE public.category_home_home_products OWNER TO postgres;

--
-- Name: category_restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_restaurant (
    category_restaurantid bigint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.category_restaurant OWNER TO postgres;

--
-- Name: category_restaurant_category_restaurantid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_restaurant_category_restaurantid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_restaurant_category_restaurantid_seq OWNER TO postgres;

--
-- Name: category_restaurant_category_restaurantid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_restaurant_category_restaurantid_seq OWNED BY public.category_restaurant.category_restaurantid;


--
-- Name: category_restaurant_restaurant_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category_restaurant_restaurant_products (
    category_restaurant_category_restaurantid bigint NOT NULL,
    restaurant_products_restaurant_productid bigint NOT NULL
);


ALTER TABLE public.category_restaurant_restaurant_products OWNER TO postgres;

--
-- Name: home_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.home_product (
    cooking_time integer,
    rating numeric(3,2),
    home_productid bigint NOT NULL,
    imageurl character varying(255),
    ingredients text,
    recipe text
);


ALTER TABLE public.home_product OWNER TO postgres;

--
-- Name: home_product_home_productid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.home_product_home_productid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.home_product_home_productid_seq OWNER TO postgres;

--
-- Name: home_product_home_productid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.home_product_home_productid_seq OWNED BY public.home_product.home_productid;


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id bigint NOT NULL,
    profile_name character varying(50) NOT NULL,
    registration_date timestamp(6) without time zone NOT NULL,
    addressid bigint
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: profiles_category_homes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles_category_homes (
    profile_id bigint NOT NULL,
    category_homes_category_homeid bigint NOT NULL
);


ALTER TABLE public.profiles_category_homes OWNER TO postgres;

--
-- Name: profiles_category_restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles_category_restaurants (
    profile_id bigint NOT NULL,
    category_restaurants_category_restaurantid bigint NOT NULL
);


ALTER TABLE public.profiles_category_restaurants OWNER TO postgres;

--
-- Name: profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profiles_id_seq OWNER TO postgres;

--
-- Name: profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profiles_id_seq OWNED BY public.profiles.id;


--
-- Name: restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurant (
    addressid bigint,
    restaurantid bigint NOT NULL,
    name character varying(100) NOT NULL,
    logourl character varying(255)
);


ALTER TABLE public.restaurant OWNER TO postgres;

--
-- Name: restaurant_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurant_product (
    price numeric(10,2) NOT NULL,
    rating numeric(3,2),
    spicy boolean NOT NULL,
    vegetarian boolean NOT NULL,
    restaurant_productid bigint NOT NULL,
    restaurantid bigint,
    currency character varying(10) NOT NULL,
    description character varying(255),
    imageurl character varying(255),
    name character varying(255)
);


ALTER TABLE public.restaurant_product OWNER TO postgres;

--
-- Name: restaurant_product_restaurant_productid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.restaurant_product_restaurant_productid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.restaurant_product_restaurant_productid_seq OWNER TO postgres;

--
-- Name: restaurant_product_restaurant_productid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.restaurant_product_restaurant_productid_seq OWNED BY public.restaurant_product.restaurant_productid;


--
-- Name: restaurant_restaurantid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.restaurant_restaurantid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.restaurant_restaurantid_seq OWNER TO postgres;

--
-- Name: restaurant_restaurantid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.restaurant_restaurantid_seq OWNED BY public.restaurant.restaurantid;


--
-- Name: sub_category_home; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_category_home (
    sub_categoryid bigint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.sub_category_home OWNER TO postgres;

--
-- Name: sub_category_home_sub_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sub_category_home_sub_categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sub_category_home_sub_categoryid_seq OWNER TO postgres;

--
-- Name: sub_category_home_sub_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sub_category_home_sub_categoryid_seq OWNED BY public.sub_category_home.sub_categoryid;


--
-- Name: sub_category_restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_category_restaurant (
    sub_categoryid bigint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.sub_category_restaurant OWNER TO postgres;

--
-- Name: sub_category_restaurant_sub_categoryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sub_category_restaurant_sub_categoryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sub_category_restaurant_sub_categoryid_seq OWNER TO postgres;

--
-- Name: sub_category_restaurant_sub_categoryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sub_category_restaurant_sub_categoryid_seq OWNED BY public.sub_category_restaurant.sub_categoryid;


--
-- Name: user_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_info (
    id integer NOT NULL,
    email character varying(255),
    name character varying(255),
    password character varying(255),
    roles character varying(255)
);


ALTER TABLE public.user_info OWNER TO postgres;

--
-- Name: user_info_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_info_id_seq OWNER TO postgres;

--
-- Name: user_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_info_id_seq OWNED BY public.user_info.id;


--
-- Name: user_info_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_info_profiles (
    user_info_id integer NOT NULL,
    profiles_id bigint NOT NULL
);


ALTER TABLE public.user_info_profiles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    addressid bigint,
    id bigint NOT NULL,
    registration_date timestamp(6) without time zone NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_category_homes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_category_homes (
    category_homes_category_homeid bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.users_category_homes OWNER TO postgres;

--
-- Name: users_category_restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_category_restaurants (
    category_restaurants_category_restaurantid bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.users_category_restaurants OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: addresses addressid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN addressid SET DEFAULT nextval('public.addresses_addressid_seq'::regclass);


--
-- Name: category_home category_homeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_home ALTER COLUMN category_homeid SET DEFAULT nextval('public.category_home_category_homeid_seq'::regclass);


--
-- Name: category_restaurant category_restaurantid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_restaurant ALTER COLUMN category_restaurantid SET DEFAULT nextval('public.category_restaurant_category_restaurantid_seq'::regclass);


--
-- Name: home_product home_productid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.home_product ALTER COLUMN home_productid SET DEFAULT nextval('public.home_product_home_productid_seq'::regclass);


--
-- Name: profiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles ALTER COLUMN id SET DEFAULT nextval('public.profiles_id_seq'::regclass);


--
-- Name: restaurant restaurantid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant ALTER COLUMN restaurantid SET DEFAULT nextval('public.restaurant_restaurantid_seq'::regclass);


--
-- Name: restaurant_product restaurant_productid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_product ALTER COLUMN restaurant_productid SET DEFAULT nextval('public.restaurant_product_restaurant_productid_seq'::regclass);


--
-- Name: sub_category_home sub_categoryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category_home ALTER COLUMN sub_categoryid SET DEFAULT nextval('public.sub_category_home_sub_categoryid_seq'::regclass);


--
-- Name: sub_category_restaurant sub_categoryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category_restaurant ALTER COLUMN sub_categoryid SET DEFAULT nextval('public.sub_category_restaurant_sub_categoryid_seq'::regclass);


--
-- Name: user_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info ALTER COLUMN id SET DEFAULT nextval('public.user_info_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (addressid, postal_code, city, country, state, street) FROM stdin;
4	12345	Cityville	Countryville	Stateville	123 Main Street
5	12345	Cityville	Countryville	Stateville	123 Main Street
6	12345	Cityville	Countryville	Stateville	123 Main Street
7	12345	Cityville	Countryville	Stateville	123 Main Street
47	31-325	Kraków	Polska	Małopolska	Jana Palacha 13
48	32-830	Wojnicz	Polska	Małopolska	Podlesie 7
49	31-320	Kraków	Polska	Małopolska	Mariana Słoneckiego 5
50	30-202	Kraków	POlska	Małopolska	Prądnicka 74
51	30-202	Kraków	Polska	Małopolska	Prądnicka 74
52	30-202	Kraków	Polska	Małopolska	Prądnicka 74
53	30-202	Kraków	Polska	Małopolska	Prądnicka 74
54	30-202	Kraków	Polska	Małopolska	Prądnicka 74
55	30-202	Kraków	Polska	Małopolska	Prądnicka 74
56	33-332	Kraków	Polska	Małopolska	Karmelicka 22
57	33-332	Kraków	Polska	Małopolska	Karmelicka 22
58	33-332	Kraków	Polska	Małopolska	Karmelicka 22
59	33-332	Kraków	Polska	Małopolska	Karmelicka 22
60	33-332	Kraków	Polska	Małopolska	Karmelicka 22
61	33-332	Kraków	Polska	Małopolska	Karmelicka 22
62	33-332	Kraków	Polska	Małopolska	Karmelicka 22
63	33-332	Kraków	Polska	Małopolska	Karmelicka 22
64	33-332	Kraków	Polska	Małopolska	Karmelicka 22
65	33-332	Kraków	Polska	Małopolska	Karmelicka 22
66	33-332	Kraków	Polska	Małopolska	Karmelicka 22
67	33-332	Kraków	Polska	Małopolska	Karmelicka 22
68	33-332	Kraków	Polska	Małopolska	Karmelicka 22
\.


--
-- Data for Name: category_home; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category_home (category_homeid, name) FROM stdin;
1	Nowa Kategoria
2	Nowa Kategoria
3	Nowa Kategoria
4	Nowa Kategoria
5	Nowa Kategoria
6	Nowa Kategoria
7	Nowa Kategoria
8	Nowa Kategoria
9	Nowa Kategoria
10	Nowa Kategoria
11	Nowa Kategoria
12	Nowa Kategoria
13	Nowa Kategoria
14	Nowa Kategoria
15	Nowa Kategoria 2 
16	Nowa Kategoria 1 
19	Nowa Kategoria
26	asdasd
29	Ramen
30	Z piekarnika🍴
\.


--
-- Data for Name: category_home_home_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category_home_home_products (category_home_category_homeid, home_products_home_productid) FROM stdin;
14	1
14	2
16	3
16	4
16	5
16	6
16	7
16	8
16	9
2	10
30	11
30	12
30	13
29	14
\.


--
-- Data for Name: category_restaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category_restaurant (category_restaurantid, name) FROM stdin;
5	Dominikanska
6	Angielska
10	Danie Kebab
11	Pyszna Pizza 🍕
12	Burgery 🍔
13	Orientalne smaki 🍜
14	Polska Kuchnia
\.


--
-- Data for Name: category_restaurant_restaurant_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category_restaurant_restaurant_products (category_restaurant_category_restaurantid, restaurant_products_restaurant_productid) FROM stdin;
10	6
10	7
10	8
10	9
10	10
10	11
13	12
13	13
13	14
13	15
13	16
13	17
13	18
13	19
13	20
13	21
13	22
13	23
13	24
\.


--
-- Data for Name: home_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.home_product (cooking_time, rating, home_productid, imageurl, ingredients, recipe) FROM stdin;
30	4.50	1	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	2	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	3	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	4	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	5	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	6	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	7	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	8	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	9	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
30	4.50	10	https://example.com/image.jpg	Składniki przykładowe	Przykładowy przepis
80	4.50	11	https://poprostupycha.com.pl/wp-content/uploads/2016/12/pizzerinki_2-768x1151.jpg	4 łyżki oliwy z oliwek ,1 płaska łyżeczka soli ,400 g mąki,szczypta oregano	Pizzerinki
80	4.50	12	https://poprostupycha.com.pl/wp-content/uploads/2016/12/pizzerinki_2-768x1151.jpg	4 łyżki oliwy z oliwek ,1 płaska łyżeczka soli ,400 g mąki,szczypta oregano	Pizzerinki
80	4.50	13	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/tantanmen-ramen.jpg	2 łyżki oleju 4 ząbki czosnku 5 cm kawałek imbiru 2 łyżki oleju chili lub 1/3 łyżeczki chili w proszku 400 g mielonego mięsa (np. łopatka wieprzowa) 3 łyżki sosu ostrygowego 4 łyżki octu ryżowego	TANTANMEN RAMEN
80	4.50	14	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/tantanmen-ramen.jpg	2 łyżki oleju 4 ząbki czosnku 5 cm kawałek imbiru 2 łyżki oleju chili lub 1/3 łyżeczki chili w proszku 400 g mielonego mięsa (np. łopatka wieprzowa) 3 łyżki sosu ostrygowego 4 łyżki octu ryżowego	TANTANMEN RAMEN
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, profile_name, registration_date, addressid) FROM stdin;
1	NowyUzytkownik2	2023-12-03 16:45:49.689623	4
2	NowyUzytkownik2	2023-12-03 17:40:03.889548	5
3	NowyUzytkownik2	2024-01-18 22:37:18.18049	6
4	NowyUzytkownik2	2024-01-18 22:38:50.030517	7
39	Mieszkanie w Krakowie	2024-01-26 22:44:19.962571	47
40	Dom Rodzinny	2024-01-26 22:45:09.850737	48
41	Profil Gościnny	2024-01-26 22:46:01.105351	49
\.


--
-- Data for Name: profiles_category_homes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles_category_homes (profile_id, category_homes_category_homeid) FROM stdin;
1	1
1	2
1	3
2	4
2	6
2	5
3	7
3	8
3	9
4	10
4	11
4	12
3	13
1	14
39	29
39	30
\.


--
-- Data for Name: profiles_category_restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles_category_restaurants (profile_id, category_restaurants_category_restaurantid) FROM stdin;
39	10
39	11
39	12
39	13
39	14
\.


--
-- Data for Name: restaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurant (addressid, restaurantid, name, logourl) FROM stdin;
50	6	lav Kebab	https://example.com/logo.jpg
51	7	lav Kebab	https://example.com/logo.jpg
52	8	lav Kebab	https://example.com/logo.jpg
53	9	lav Kebab	https://example.com/logo.jpg
54	10	lav Kebab	https://example.com/logo.jpg
55	11	lav Kebab	https://example.com/logo.jpg
56	12	lav Kebab	https://example.com/logo.jpg
57	13	lav Kebab	https://example.com/logo.jpg
58	14	lav Kebab	https://example.com/logo.jpg
59	15	lav Kebab	https://example.com/logo.jpg
60	16	lav Kebab	https://example.com/logo.jpg
61	17	lav Kebab	https://example.com/logo.jpg
62	18	lav Kebab	https://example.com/logo.jpg
63	19	lav Kebab	https://example.com/logo.jpg
64	20	lav Kebab	https://example.com/logo.jpg
65	21	lav Kebab	https://example.com/logo.jpg
66	22	lav Kebab	https://example.com/logo.jpg
67	23	lav Kebab	https://example.com/logo.jpg
68	24	lav Kebab	https://example.com/logo.jpg
\.


--
-- Data for Name: restaurant_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurant_product (price, rating, spicy, vegetarian, restaurant_productid, restaurantid, currency, description, imageurl, name) FROM stdin;
26.00	4.50	t	f	6	6	PLN	Mięso do wyboru, sałata lodowa, pekinska, kapusta czerwona i biała, ogórek kiszony, pomidor, cebula	https://kebab-habiby-pl.restauracja.online/media/cache/resolve/large/upload/danie/kebab-habiby-kebab-pita.jpg	Pita duża
38.00	4.50	t	f	7	7	PLN	Mięso do wyboru, sałata lodowa, pekinska, kapusta czerwona i biała, ogórek kiszony, pomidor, cebula	https://www.berlindonerkebap.com/uploads/menu/obrazki-produktowe/_big/original_BDK_332x332_megaweb.jpg	Mega durum
32.00	4.50	f	f	8	8	PLN	Mięso do wyboru, sałata lodowa, pekinska, kapusta czerwona i biała, ogórek kiszony, pomidor, cebula	https://poradnikrestauratora.pl/wp-content/uploads/sites/2/2023/07/a2bbd003ad6f73193ea183aba7f31740-1-e1689855997902.png	Danie Kebab
32.00	4.50	f	t	9	9	PLN	pieczarki, ser, szczypiorek	https://cdn.tasteatlas.com/images/dishes/1f7027facc7943098b25ea71ce206631.jpg	Zapiekanka
18.00	4.50	t	f	10	10	PLN	Mięso do wyboru, sałata lodowa, pekinska, kapusta czerwona i biała, ogórek kiszony, pomidor, cebula	https://poradnikrestauratora.pl/wp-content/uploads/sites/2/2023/07/a2bbd003ad6f73193ea183aba7f31740-1-e1689855997902.png	Danie Kebab
18.00	4.50	t	f	11	11	PLN	Mięso do wyboru, sałata lodowa, pekinska, kapusta czerwona i biała, ogórek kiszony, pomidor, cebula	https://poradnikrestauratora.pl/wp-content/uploads/sites/2/2023/07/a2bbd003ad6f73193ea183aba7f31740-1-e1689855997902.png	Kebab
18.00	4.50	t	f	12	12	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	13	13	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	14	14	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	15	15	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	16	16	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	17	17	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	18	18	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	19	19	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	20	20	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	21	21	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	22	22	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	23	23	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
18.00	4.50	t	f	24	24	PLN	Ramen z łososiem 	https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/ramen-z-lososiem-00.jpg	Ramen
\.


--
-- Data for Name: sub_category_home; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_category_home (sub_categoryid, name) FROM stdin;
\.


--
-- Data for Name: sub_category_restaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sub_category_restaurant (sub_categoryid, name) FROM stdin;
\.


--
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_info (id, email, name, password, roles) FROM stdin;
1	ex@email.com	ans3	$2a$10$YfrRtQk9lgmGE371zp4YKuUmfkeRUlTM.Z8QsUeMHIAg7YqTPpo96	ROLE_USER
7	test1@email.com	test1	$2a$10$4FscQhje/.W4JBaK6qowmOuObSkpl4wsz2VUVUXnl76wp6c2sgN8O	ROLE_USER
12	test3@email.com	test3	$2a$10$LLsehCiuugxLuMqOPNvk5u96.LrhgqVlrCTtDD7XrzBAZX8.JoHk.	ROLE_USER
13	pawelkrzysci@test.pl	\N	$2a$10$pZcydWNZ0ikdP8xgermVXuasv0k5G9kf0blRoDrkwYwiaEqqeqv/m	\N
14	test	\N	$2a$10$Wspz6gvyho5vl5d7gmStHeDXINdvv.lUU44jYD4g3SPjiPuD2G28G	\N
18	asd@test	\N	$2a$10$a/fK4vx27ppAE8W23maw2ebjn32mAKAN7rl62sa/cFJM4bnVUU286	\N
20	antoni@wasyl.com	\N	$2a$10$iKk3xJLxmA84HQHqXPNfseDOP/QXpN5jurL8BYuh5ijHWnm9fp.DS	\N
21	antoni2@wasyl.com	\N	$2a$10$51TxX10.M3cXw2cTHE0MOOOEcWZamMcTcxU5qc2a61boradEuvTke	\N
23	test53@email.com	test35	$2a$10$LFoLwgjDwd1LHlyAR5WOquV8/lMnJ6BWLBKIC6aXpjU14qe5S8gCi	ROLE_USER
25	antoni21@wasyl.com	Anon23	$2a$10$3k0N2v60KntUotqzZCZ1i.MT.KPpj.HimNSP83JUH/Pi8TugKO5Xa	ROLE_USER
26	asd		$2a$10$7jsrAokZ0EfDPJh8tvUVPOFsT9MDxBnEMj9QcV2ZPbo40kz2R4pcu	ROLE_USER
34	lukieoo@email.com	lukieoo	$2a$10$eG/aSFtBwhCMFNnJT7IWOu9xNbw3rEoNUKsIefZq.Rqaj4FJaRlGS	ROLE_USER
35	asnion@pl.com	user	$2a$10$cg66mhhgKg85k9ZOsOQlDuRa5E8YROoOn0VFyasKqnxD4DHCr6FoO	ROLE_USER
\.


--
-- Data for Name: user_info_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_info_profiles (user_info_id, profiles_id) FROM stdin;
7	2
34	39
34	40
34	41
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (addressid, id, registration_date, username, email, password) FROM stdin;
\.


--
-- Data for Name: users_category_homes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_category_homes (category_homes_category_homeid, user_id) FROM stdin;
\.


--
-- Data for Name: users_category_restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_category_restaurants (category_restaurants_category_restaurantid, user_id) FROM stdin;
\.


--
-- Name: addresses_addressid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_addressid_seq', 68, true);


--
-- Name: category_home_category_homeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_home_category_homeid_seq', 30, true);


--
-- Name: category_restaurant_category_restaurantid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_restaurant_category_restaurantid_seq', 14, true);


--
-- Name: home_product_home_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.home_product_home_productid_seq', 14, true);


--
-- Name: profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profiles_id_seq', 41, true);


--
-- Name: restaurant_product_restaurant_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurant_product_restaurant_productid_seq', 24, true);


--
-- Name: restaurant_restaurantid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurant_restaurantid_seq', 24, true);


--
-- Name: sub_category_home_sub_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_category_home_sub_categoryid_seq', 1, false);


--
-- Name: sub_category_restaurant_sub_categoryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sub_category_restaurant_sub_categoryid_seq', 1, false);


--
-- Name: user_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_info_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (addressid);


--
-- Name: category_home_home_products category_home_home_products_home_products_home_productid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_home_home_products
    ADD CONSTRAINT category_home_home_products_home_products_home_productid_key UNIQUE (home_products_home_productid);


--
-- Name: category_home_home_products category_home_home_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_home_home_products
    ADD CONSTRAINT category_home_home_products_pkey PRIMARY KEY (category_home_category_homeid, home_products_home_productid);


--
-- Name: category_home category_home_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_home
    ADD CONSTRAINT category_home_pkey PRIMARY KEY (category_homeid);


--
-- Name: category_restaurant category_restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_restaurant
    ADD CONSTRAINT category_restaurant_pkey PRIMARY KEY (category_restaurantid);


--
-- Name: category_restaurant_restaurant_products category_restaurant_restauran_restaurant_products_restauran_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_restaurant_restaurant_products
    ADD CONSTRAINT category_restaurant_restauran_restaurant_products_restauran_key UNIQUE (restaurant_products_restaurant_productid);


--
-- Name: category_restaurant_restaurant_products category_restaurant_restaurant_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_restaurant_restaurant_products
    ADD CONSTRAINT category_restaurant_restaurant_products_pkey PRIMARY KEY (category_restaurant_category_restaurantid, restaurant_products_restaurant_productid);


--
-- Name: home_product home_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.home_product
    ADD CONSTRAINT home_product_pkey PRIMARY KEY (home_productid);


--
-- Name: profiles_category_homes profiles_category_homes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_homes
    ADD CONSTRAINT profiles_category_homes_pkey PRIMARY KEY (profile_id, category_homes_category_homeid);


--
-- Name: profiles_category_restaurants profiles_category_restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_restaurants
    ADD CONSTRAINT profiles_category_restaurants_pkey PRIMARY KEY (profile_id, category_restaurants_category_restaurantid);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: restaurant restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (restaurantid);


--
-- Name: restaurant_product restaurant_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_product
    ADD CONSTRAINT restaurant_product_pkey PRIMARY KEY (restaurant_productid);


--
-- Name: sub_category_home sub_category_home_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category_home
    ADD CONSTRAINT sub_category_home_pkey PRIMARY KEY (sub_categoryid);


--
-- Name: sub_category_restaurant sub_category_restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_category_restaurant
    ADD CONSTRAINT sub_category_restaurant_pkey PRIMARY KEY (sub_categoryid);


--
-- Name: user_info uk_21gcrpxwqst2mvhvq4mo8f6uy; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT uk_21gcrpxwqst2mvhvq4mo8f6uy UNIQUE (name);


--
-- Name: profiles_category_homes uk_eeaxnn9x2kbny290ryv239tui; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_homes
    ADD CONSTRAINT uk_eeaxnn9x2kbny290ryv239tui UNIQUE (category_homes_category_homeid);


--
-- Name: user_info uk_gnu0k8vv6ptioedbxbfsnan9g; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT uk_gnu0k8vv6ptioedbxbfsnan9g UNIQUE (email);


--
-- Name: profiles_category_restaurants uk_i8yvcdd4y1fxtlae2892xawki; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_restaurants
    ADD CONSTRAINT uk_i8yvcdd4y1fxtlae2892xawki UNIQUE (category_restaurants_category_restaurantid);


--
-- Name: user_info_profiles uk_m1p7q63ws9j0dpyec1wtcw5tx; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info_profiles
    ADD CONSTRAINT uk_m1p7q63ws9j0dpyec1wtcw5tx UNIQUE (profiles_id);


--
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (id);


--
-- Name: user_info_profiles user_info_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info_profiles
    ADD CONSTRAINT user_info_profiles_pkey PRIMARY KEY (user_info_id, profiles_id);


--
-- Name: users_category_homes users_category_homes_category_homes_category_homeid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_homes
    ADD CONSTRAINT users_category_homes_category_homes_category_homeid_key UNIQUE (category_homes_category_homeid);


--
-- Name: users_category_homes users_category_homes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_homes
    ADD CONSTRAINT users_category_homes_pkey PRIMARY KEY (category_homes_category_homeid, user_id);


--
-- Name: users_category_restaurants users_category_restaurants_category_restaurants_category_re_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_restaurants
    ADD CONSTRAINT users_category_restaurants_category_restaurants_category_re_key UNIQUE (category_restaurants_category_restaurantid);


--
-- Name: users_category_restaurants users_category_restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_restaurants
    ADD CONSTRAINT users_category_restaurants_pkey PRIMARY KEY (category_restaurants_category_restaurantid, user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_category_restaurants fk15u9gjj3b96vdfyqrmgppflc5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_restaurants
    ADD CONSTRAINT fk15u9gjj3b96vdfyqrmgppflc5 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users fk2gx45jn66hwaen903copo4ckm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk2gx45jn66hwaen903copo4ckm FOREIGN KEY (addressid) REFERENCES public.addresses(addressid);


--
-- Name: category_restaurant_restaurant_products fk39at0ss8rmmqlpqrtiyogd3u2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_restaurant_restaurant_products
    ADD CONSTRAINT fk39at0ss8rmmqlpqrtiyogd3u2 FOREIGN KEY (restaurant_products_restaurant_productid) REFERENCES public.restaurant_product(restaurant_productid);


--
-- Name: category_restaurant_restaurant_products fk51slvfyjb0asy9x1alk8g97uh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_restaurant_restaurant_products
    ADD CONSTRAINT fk51slvfyjb0asy9x1alk8g97uh FOREIGN KEY (category_restaurant_category_restaurantid) REFERENCES public.category_restaurant(category_restaurantid);


--
-- Name: profiles_category_restaurants fk6t8o2stdw0rl7qi025appfd5q; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_restaurants
    ADD CONSTRAINT fk6t8o2stdw0rl7qi025appfd5q FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: profiles_category_homes fk7wgouostu7erulsvvsnowask7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_homes
    ADD CONSTRAINT fk7wgouostu7erulsvvsnowask7 FOREIGN KEY (category_homes_category_homeid) REFERENCES public.category_home(category_homeid);


--
-- Name: category_home_home_products fk9tim0kejis2aalqglsnriucgu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_home_home_products
    ADD CONSTRAINT fk9tim0kejis2aalqglsnriucgu FOREIGN KEY (category_home_category_homeid) REFERENCES public.category_home(category_homeid);


--
-- Name: user_info_profiles fk9umf092hcbek0m3336bwrrdcq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info_profiles
    ADD CONSTRAINT fk9umf092hcbek0m3336bwrrdcq FOREIGN KEY (user_info_id) REFERENCES public.user_info(id);


--
-- Name: user_info_profiles fka0ixfn6qqib225jpekwj6m68i; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info_profiles
    ADD CONSTRAINT fka0ixfn6qqib225jpekwj6m68i FOREIGN KEY (profiles_id) REFERENCES public.profiles(id);


--
-- Name: users_category_homes fkat53jskaevkl9pse52wkjlccj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_homes
    ADD CONSTRAINT fkat53jskaevkl9pse52wkjlccj FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: restaurant_product fkaxo1lv2s4j8cmm266vu39fgb5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_product
    ADD CONSTRAINT fkaxo1lv2s4j8cmm266vu39fgb5 FOREIGN KEY (restaurantid) REFERENCES public.restaurant(restaurantid);


--
-- Name: profiles_category_restaurants fkdd5vh7w7ey6e1cg1h5mkkop1a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_restaurants
    ADD CONSTRAINT fkdd5vh7w7ey6e1cg1h5mkkop1a FOREIGN KEY (category_restaurants_category_restaurantid) REFERENCES public.category_restaurant(category_restaurantid);


--
-- Name: profiles fkdxp2sc2fsjtonv5jyxf2fibro; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT fkdxp2sc2fsjtonv5jyxf2fibro FOREIGN KEY (addressid) REFERENCES public.addresses(addressid);


--
-- Name: users_category_homes fkgyxojcrcrryvqaabcj773dnmv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_homes
    ADD CONSTRAINT fkgyxojcrcrryvqaabcj773dnmv FOREIGN KEY (category_homes_category_homeid) REFERENCES public.category_home(category_homeid);


--
-- Name: profiles_category_homes fkj2cefr47fipfxob6sjq3ssjo2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_category_homes
    ADD CONSTRAINT fkj2cefr47fipfxob6sjq3ssjo2 FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: restaurant fkla7eswfm06p9yklh2brj74cjg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT fkla7eswfm06p9yklh2brj74cjg FOREIGN KEY (addressid) REFERENCES public.addresses(addressid);


--
-- Name: users_category_restaurants fkn3e4du0e5mb8gnjascgsitja8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_category_restaurants
    ADD CONSTRAINT fkn3e4du0e5mb8gnjascgsitja8 FOREIGN KEY (category_restaurants_category_restaurantid) REFERENCES public.category_restaurant(category_restaurantid);


--
-- Name: category_home_home_products fknxvt5qs28jod74mwrkyr35enk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category_home_home_products
    ADD CONSTRAINT fknxvt5qs28jod74mwrkyr35enk FOREIGN KEY (home_products_home_productid) REFERENCES public.home_product(home_productid);


--
-- PostgreSQL database dump complete
--

