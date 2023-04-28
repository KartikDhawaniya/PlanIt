drop table if exists users, payments, items, item_sponsor, events, event_items, event_host;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  mname VARCHAR(255),
  lname VARCHAR(255),
  mobile VARCHAR(20) UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE
);



CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  description TEXT,
  completed BOOL NOT NULL 
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(63) NOT NULL,
  description VARCHAR(255) NOT NULL,  
  expense int
);


CREATE TABLE item_payings (
  item_id INT,
  payer_id INT,
  amount INT NOT NULL,
  PRIMARY KEY (item_id, payer_id),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (payer_id) REFERENCES users(id)
);

CREATE TABLE item_owings (
  item_id INT,
  ower_id INT,
  amount INT NOT NULL,
  PRIMARY KEY (item_id, ower_id),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (ower_id) REFERENCES users(id)
);

CREATE TABLE event_participant (
  event_id INT,
  participant_id INT,
  PRIMARY KEY (event_id, participant_id),
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (participant_id) REFERENCES users(id)
);

CREATE TABLE event_items (
  event_id INT,
  item_id INT,
  PRIMARY KEY (event_id, item_id),
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE payments (
  receiver_id INT,
  payer_id INT,
  event_id INT,
  item_id INT,
  amount DECIMAL(10, 2),
  pending BOOLEAN,
  PRIMARY KEY (receiver_id, payer_id, event_id, item_id),
  FOREIGN KEY (receiver_id) REFERENCES users(id),
  FOREIGN KEY (payer_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE OR REPLACE FUNCTION check_item_sponsor_host()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM event_host eh
    INNER JOIN event_items ei ON eh.event_id = ei.event_id
    WHERE eh.host_id = NEW.sponsor_id AND ei.item_id = NEW.item_id
  ) THEN
    RAISE EXCEPTION 'Host does not belong to the event of the item';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER item_sponsor_host_trigger
BEFORE INSERT OR UPDATE ON item_sponsor
FOR EACH ROW EXECUTE FUNCTION check_item_sponsor_host();
