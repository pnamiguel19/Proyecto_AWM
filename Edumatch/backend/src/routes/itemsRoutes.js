import express from 'express';
import {
  getAllItems,
  createItem,
  deleteItem,
  getItemById
} from '../controllers/itemsController.js';

const router = express.Router();

/**
 * @route   GET /api/items
 * @desc    Obtener todos los items
 * @access  Public
 */
router.get('/', getAllItems);

/**
 * @route   GET /api/items/:id
 * @desc    Obtener un item por ID
 * @access  Public
 */
router.get('/:id', getItemById);

/**
 * @route   POST /api/items
 * @desc    Crear un nuevo item
 * @access  Public
 * @body    { name: string, description: string, price: number }
 */
router.post('/', createItem);

/**
 * @route   DELETE /api/items/:id
 * @desc    Eliminar un item por ID
 * @access  Public
 */
router.delete('/:id', deleteItem);

export default router;
