CREATE TABLE users (
  id INT PRIMARY KEY,
  fname VARCHAR(255),
  mname VARCHAR(255),
  lname VARCHAR(255),
  mobile VARCHAR(20) UNIQUE,
  password VARCHAR(255),
  email VARCHAR(255) UNIQUE
);


CREATE TABLE events (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  date DATE,
  description TEXT
);


CREATE TABLE items (
  id INT PRIMARY KEY,
  name VARCHAR(255)
);


CREATE TABLE item_sponsor (
  item_id INT,
  sponsor_id INT,
  amount DECIMAL(10, 2),
  PRIMARY KEY (item_id, sponsor_id),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (sponsor_id) REFERENCES users(id)
);

CREATE TABLE event_host (
  event_id INT,
  host_id INT,
  PRIMARY KEY (event_id, host_id),
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (host_id) REFERENCES users(id)
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

