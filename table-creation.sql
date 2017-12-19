--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
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


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: elizabethpetersen
--

CREATE TABLE favorites (
    user_id integer,
    images_id integer
);


ALTER TABLE favorites OWNER TO elizabethpetersen;

--
-- Name: images; Type: TABLE; Schema: public; Owner: elizabethpetersen
--

CREATE TABLE images (
    image_id integer NOT NULL,
    rover character varying(20),
    camera character varying(30),
    url character varying
);


ALTER TABLE images OWNER TO elizabethpetersen;

--
-- Name: users; Type: TABLE; Schema: public; Owner: elizabethpetersen
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(50)
);


ALTER TABLE users OWNER TO elizabethpetersen;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: elizabethpetersen
--

CREATE SEQUENCE users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO elizabethpetersen;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: elizabethpetersen
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: elizabethpetersen
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: elizabethpetersen
--

COPY favorites (user_id, images_id) FROM stdin;
1	32
4	42
2	529346
3	42
2	102686
4	529346
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: elizabethpetersen
--

COPY images (image_id, rover, camera, url) FROM stdin;
32	spirit	fhaz	http://lilredridingliz.com
42	Curiosity	FHAZ	http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01194/opgs/edr/fcam/FLB_503501731EDR_F0512704FHAZ00304M_.JPG
529346	Curiosity	FHAZ	http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01194/opgs/edr/fcam/FLB_503501731EDR_F0512704FHAZ00304M_.JPG
102686	Curiosity	FHAZ	http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01004/opgs/edr/fcam/FRB_486615455EDR_F0481570FHAZ00323M_.JPG
102843	Curiosity	RHAZ	http://mars.jpl.nasa.gov/msl-ra-images/proj/msl/redops/ods/survace/sol/01004/opgs/edr/rcam/RRB_486615482EDR_F0481570RHAZ00323M_.JPG
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: elizabethpetersen
--

COPY users (id, name) FROM stdin;
1	katlyn
2	liz
3	charlie
4	carmen
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: elizabethpetersen
--

SELECT pg_catalog.setval('users_id_seq', 4, true);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: elizabethpetersen
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: elizabethpetersen
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_images_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: elizabethpetersen
--

ALTER TABLE ONLY favorites
    ADD CONSTRAINT favorites_images_id_fkey FOREIGN KEY (images_id) REFERENCES images(image_id);


--
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: elizabethpetersen
--

ALTER TABLE ONLY favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- PostgreSQL database dump complete
--

