import express from 'express';
import { pool } from '../config/database.js';

const router = express.Router();

// Function to get all restaurants from the database
const getRestaurants = async () => {
    try {
        const result = await pool.query('SELECT * FROM restaurants');
        return result.rows;
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};

// Function to get reviews for a specific restaurant
const getReviewsForRestaurant = async (restaurantId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1',
            [restaurantId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

// Function to create a new restaurant in the database
const createRestaurant = async (restaurantData) => {
    const { name, phone, address, photo } = restaurantData;
    try {
        const result = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, address, photo]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

// Function to update an existing restaurant in the database
const updateRestaurant = async (id, restaurantData) => {
    const { name, phone, address, photo } = restaurantData;
    try {
        const result = await pool.query(
            'UPDATE restaurants SET name = $1, phone = $2, address = $3, photo = $4 WHERE id = $5 RETURNING *',
            [name, phone, address, photo, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating restaurant:', error);
        throw error;
    }
};

// Function to delete a restaurant from the database
const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM restaurants WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
};

// Route to render the restaurants page
router.get('/restaurants', async (req, res) => {
    try {
        const restaurantData = await getRestaurants();
        res.render('restaurants', { restaurantData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching restaurants');
    }
});

// Route to get reviews for a specific restaurant
router.get('/restaurants/:id/reviews', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const reviews = await getReviewsForRestaurant(id);
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

// POST route to create a new restaurant
router.post('/restaurants', async (req, res) => {
    const restaurantData = req.body;
    try {
        const restaurant = await createRestaurant(restaurantData);
        res.status(200).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": `${error}` });
    }
});

// PATCH route to update a restaurant by id
router.patch('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const restaurantData = req.body;
    try {
        const updatedRestaurant = await updateRestaurant(id, restaurantData);
        if (updatedRestaurant) {
            res.status(200).json(updatedRestaurant);
        } else {
            res.status(404).json({ "message": "Restaurant not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": `${error}` });
    }
});

// DELETE route to delete a restaurant by id
router.delete('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const deletedRestaurant = await deleteRestaurant(id);
        if (deletedRestaurant) {
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting restaurant' });
    }
});

// Export the router as backendRouter
export { router as backendRouter };
