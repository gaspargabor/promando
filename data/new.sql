ALTER TABLE IF EXISTS ONLY public.board DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_statuses_id CASCADE;


DROP TABLE IF EXISTS public.board;
DROP SEQUENCE IF EXISTS public.board_id_seq;
CREATE TABLE board (
    id serial NOT NULL,
    title text
);

DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.cards_id_seq;
CREATE TABLE cards (
    id serial NOT NULL,
    board_id integer,
    title text,
    status_id integer,
    "order" integer
);

DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.statuses_id_seq;
CREATE TABLE statuses (
    id serial NOT NULL,
    title text
);

ALTER TABLE ONLY board
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES board(id);
