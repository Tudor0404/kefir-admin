-- RECIPE FUNCTIONS --

-- Function to increment the recipe version if the content has changed
CREATE OR REPLACE FUNCTION increment_recipe_version() RETURNS TRIGGER AS $$
BEGIN
    -- Check if the recipe content has changed
    IF OLD.name != NEW.name OR OLD.ingredients::text != NEW.ingredients::text OR OLD.notes != NEW.notes THEN
        -- Increment the version number
        NEW.latest_version := OLD.latest_version + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- BEFORE UPDATE trigger on recipe table to handle version increment
DROP TRIGGER IF EXISTS tr_increment_recipe_version ON recipe;
CREATE TRIGGER tr_increment_recipe_version
BEFORE UPDATE ON recipe
FOR EACH ROW
EXECUTE FUNCTION increment_recipe_version();

-- Function to manage the recipe version after an update
CREATE OR REPLACE FUNCTION manage_recipe_version() RETURNS TRIGGER AS $$
BEGIN
    -- When an existing recipe is updated
    IF TG_OP = 'UPDATE' THEN
        -- Check if the recipe content has changed
        IF OLD.name != NEW.name OR OLD.ingredients::text != NEW.ingredients::text OR OLD.notes != NEW.notes THEN
            INSERT INTO recipe_version (recipe_id, name, ingredients, notes, version, date_created)
            VALUES (NEW.id, NEW.name, NEW.ingredients, NEW.notes, NEW.latest_version, NOW());
        END IF;
        RETURN NEW;
    END IF;
    
    RETURN NULL; -- default return value
END;
$$ LANGUAGE plpgsql;


-- Function to add the first version to the version table when a new recipe is created
CREATE OR REPLACE FUNCTION add_initial_recipe_version() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO recipe_version (recipe_id, name, ingredients, notes, version, date_created) 
    VALUES (NEW.id, NEW.name, NEW.ingredients, NEW.notes, NEW.latest_version, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- AFTER INSERT trigger on recipe table to insert into recipe_version
DROP TRIGGER IF EXISTS tr_add_initial_recipe_version ON recipe;
CREATE TRIGGER tr_add_initial_recipe_version
AFTER INSERT ON recipe
FOR EACH ROW
EXECUTE FUNCTION add_initial_recipe_version();





-- CONTAINER FUNCTIONS --

-- Function to increment the container version if the content has changed
CREATE OR REPLACE FUNCTION increment_container_version() RETURNS TRIGGER AS $$
BEGIN
    -- Check if the container content has changed
    IF OLD.rfid != NEW.rfid OR OLD.capacity != NEW.capacity THEN
        -- Increment the version number
        NEW.latest_version := OLD.latest_version + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- BEFORE UPDATE trigger on container table to handle version increment
DROP TRIGGER IF EXISTS tr_increment_container_version ON container;
CREATE TRIGGER tr_increment_container_version
BEFORE UPDATE ON container
FOR EACH ROW
EXECUTE FUNCTION increment_container_version();

-- Function to manage the container version after an update
CREATE OR REPLACE FUNCTION manage_container_version() RETURNS TRIGGER AS $$
BEGIN
    -- When an existing container is updated
    IF TG_OP = 'UPDATE' THEN
        -- Check if the container content has changed
        IF OLD.rfid != NEW.rfid OR OLD.capacity != NEW.capacity THEN
            INSERT INTO container_version (container_id, rfid, capacity, version, date_created)
            VALUES (NEW.id, NEW.rfid, NEW.capacity, NEW.latest_version, NOW());
        END IF;
        RETURN NEW;
    END IF;
    
    RETURN NULL; -- default return value
END;
$$ LANGUAGE plpgsql;

-- Function to add the first version to the version table when a new container is created
CREATE OR REPLACE FUNCTION add_initial_container_version() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO container_version (container_id, rfid, capacity, version, date_created) 
    VALUES (NEW.id, NEW.rfid, NEW.capacity, NEW.latest_version, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- AFTER INSERT trigger on container table to insert into container_version
DROP TRIGGER IF EXISTS tr_add_initial_container_version ON container;
CREATE TRIGGER tr_add_initial_container_version
AFTER INSERT ON container
FOR EACH ROW
EXECUTE FUNCTION add_initial_container_version();





-- STATION FUNCTIONS --

-- Function to increment the station version if the content has changed
CREATE OR REPLACE FUNCTION increment_station_version() RETURNS TRIGGER AS $$
BEGIN
    -- Check if the station content has changed
    IF OLD.mqtt_id != NEW.mqtt_id OR OLD.name != NEW.name OR OLD.notes != NEW.notes THEN
        -- Increment the version number
        NEW.latest_version := OLD.latest_version + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- BEFORE UPDATE trigger on station table to handle version increment
DROP TRIGGER IF EXISTS tr_increment_station_version ON station;
CREATE TRIGGER tr_increment_station_version
BEFORE UPDATE ON station
FOR EACH ROW
EXECUTE FUNCTION increment_station_version();

-- Function to manage the station version after an update
CREATE OR REPLACE FUNCTION manage_station_version() RETURNS TRIGGER AS $$
BEGIN
    -- When an existing station is updated
    IF TG_OP = 'UPDATE' THEN
        -- Check if the station content has changed
        IF OLD.mqtt_id != NEW.mqtt_id OR OLD.name != NEW.name OR OLD.notes != NEW.notes THEN
            INSERT INTO station_version (station_id, mqtt_id, last_active, last_message, version, date_created, notes)
            VALUES (NEW.id, NEW.mqtt_id, NEW.last_active, NEW.last_message, NEW.latest_version, NOW(), NEW.notes);
        END IF;
        RETURN NEW;
    END IF;
    
    RETURN NULL; -- default return value
END;
$$ LANGUAGE plpgsql;

-- Function to add the first version to the version table when a new station is created
CREATE OR REPLACE FUNCTION add_initial_station_version() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO station_version(station_id, mqtt_id, name, version, date_created, notes) 
    VALUES (NEW.id, NEW.mqtt_id, NEW.name, NEW.latest_version, NOW(), NEW.notes);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- AFTER INSERT trigger on station table to insert into station_version
DROP TRIGGER IF EXISTS tr_add_initial_station_version ON station;
CREATE TRIGGER tr_add_initial_station_version
AFTER INSERT ON station
FOR EACH ROW
EXECUTE FUNCTION add_initial_station_version();

