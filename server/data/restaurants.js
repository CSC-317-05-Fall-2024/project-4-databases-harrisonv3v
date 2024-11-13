import { pool } from '../config/database.js';

// Get all restaurants
const getRestaurants = async () => {
    try {
        const results = await pool.query('SELECT * FROM restaurants ORDER BY id ASC');
        return results.rows;
    } catch (error) {
        console.error("Error fetching restaurants:", error.message);
    }
};

// Get a single restaurant by ID
const getRestaurant = async (id) => {
    try {
        const results = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        return results.rows[0];
    } catch (error) {
        console.error("Error fetching restaurant:", error.message);
    }
};

// Create a new restaurant
const createRestaurant = async (data) => {
    try {
        const { name, phone, address, photo } = data;
        const results = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, address, photo]
        );
        return results.rows[0];
    } catch (error) {
        console.error("Error creating restaurant:", error.message);
    }
};

// Update a restaurant by ID
const updateRestaurant = async (id, data) => {
    try {
        const query = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        const current = query.rows[0];
        
        let updatedData = {
            ...current,
            ...data
        };

        const { name, phone, address, photo } = updatedData;
        const results = await pool.query(
            'UPDATE restaurants SET name = $1, phone = $2, address = $3, photo = $4 WHERE id = $5 RETURNING *',
            [name, phone, address, photo, id]
        );
        return results.rows[0];
    } catch (error) {
        console.error("Error updating restaurant:", error.message);
    }
};

// Delete a restaurant by ID
const deleteRestaurant = async (id) => {
    try {
        const results = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        return results.rows[0];
    } catch (error) {
        console.error("Error deleting restaurant:", error.message);
    }
};


const getReviewsForRestaurant = async (restaurantId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY id ASC',
            [restaurantId]
        );
        return result.rows; // Returns an array of review objects
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant, getReviewsForRestaurant };

