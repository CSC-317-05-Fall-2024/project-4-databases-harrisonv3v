import { pool } from './database.js';

const dropTables = async () => {
    try {
        console.log("Dropping tables...");
        const dropTablesQuery = `
            DROP TABLE IF EXISTS reviews;
        `;
        await pool.query(dropTablesQuery);
        console.log("Reviews table dropped.");
    } catch (error) {
        console.log("Error dropping tables:", error);
    }
};

const createTables = async () => {
    try {
        console.log("Creating tables...");
        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                address VARCHAR(255),
                photo VARCHAR(255)
            );

            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
                rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                content TEXT NOT NULL
            );
        `;
        await pool.query(createTablesQuery);
        console.log("Tables created.");
    } catch (error) {
        console.log("Error creating tables:", error);
    }
};

const insertData = async () => {
    try {
        console.log("Inserting data...");

        // Check if restaurants already exist to prevent duplicate insertion
        const checkRestaurants = await pool.query('SELECT COUNT(*) FROM restaurants');
        if (parseInt(checkRestaurants.rows[0].count) === 0) {
            const insertRestaurantsQuery = `
                INSERT INTO restaurants (name, phone, address, photo) VALUES
                    ('Scoma''s Restaurant', '(415) 771-4383', '1965 Al Scoma Way, San Francisco, CA 94133', '/images/scoma.webp'),
                    ('Dalida', '(415) 237-1999', '101 Montgomery St, San Francisco, CA 94129', '/images/dalida.webp'),
                    ('Golden Boy Pizza', '(415) 123-4567', '542 Green St, San Francisco, CA 94133', '/images/goldenboypizza.webp'),
                    ('Maison Nico', '(415) 359-1000', '710 Montgomery St, San Francisco, CA 94111', '/images/maison.webp'),
                    ('Hog Island Oyster Co.', '(415) 391-7117', 'Ferry Building, #11, San Francisco, CA 94111', '/images/hog.webp'),
                    ('City View Restaurant', '(415) 398-2838', '33 Walter U Lum Pl, San Francisco, CA 94108', '/images/cityview.webp'),
                    ('Sam Wo Restaurant', '(415) 989-8898', '713 Clay St, San Francisco, CA 94108', '/images/samwo.webp'),
                    ('Daeho Kalbijjim & Beef Soup', '(415) 563-1388', '1620 Post St, San Francisco, CA 94115', '/images/daeho.webp'),
                    ('Copra', '(415) 873-0795', '1700 Fillmore St, San Francisco, CA 94115', '/images/copra.webp');
            `;
            await pool.query(insertRestaurantsQuery);
            console.log("Restaurant data inserted.");
        } else {
            console.log("Restaurant data already exists, skipping insertion.");
        }

        // Insert data into reviews only if no reviews exist
        const checkReviews = await pool.query('SELECT COUNT(*) FROM reviews');
        if (parseInt(checkReviews.rows[0].count) === 0) {
            const insertReviewsQuery = `
                INSERT INTO reviews (restaurant_id, rating, content) VALUES
                    (1, 5, 'Amazing seafood and great view!'),
                    (1, 4, 'Good experience overall.'),
                    (2, 3, 'Nice ambiance but food was average.'),
                    (2, 5, 'Absolutely loved the food!'),
                    (3, 4, 'Great pizza and cozy place.'),
                    (4, 2, 'Overpriced for the quality of food.');
            `;
            await pool.query(insertReviewsQuery);
            console.log("Review data inserted.");
        } else {
            console.log("Review data already exists, skipping insertion.");
        }
    } catch (error) {
        console.log("Error inserting data:", error);
    }
};

const setup = async () => {
    await dropTables();  // Only drops reviews table, not restaurants
    await createTables();
    await insertData();
};

setup();


