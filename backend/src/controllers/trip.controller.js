import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    createTrip,
    getTrips,
    getTripById,
    dispatchTrip,
    completeTrip,
    cancelTrip,
} from "../services/trip.service.js";

/**
 * POST /api/trips
 */
const createTripController = asyncHandler(async (req, res) => {
    const trip = await createTrip(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            trip,
            "Trip created successfully"
        )
    );
});

/**
 * GET /api/trips
 */
const getTripsController = asyncHandler(async (req, res) => {
    const trips = await getTrips();

    return res.status(200).json(
        new ApiResponse(
            200,
            trips,
            "Trips fetched successfully"
        )
    );
});

/**
 * GET /api/trips/:tripId
 */
const getTripByIdController = asyncHandler(async (req, res) => {
    const { tripId } = req.params;

    const trip = await getTripById(tripId);

    return res.status(200).json(
        new ApiResponse(
            200,
            trip,
            "Trip fetched successfully"
        )
    );
});

/**
 * PATCH /api/trips/:tripId/dispatch
 */
const dispatchTripController = asyncHandler(async (req, res) => {
    const { tripId } = req.params;

    const trip = await dispatchTrip(tripId);

    return res.status(200).json(
        new ApiResponse(
            200,
            trip,
            "Trip dispatched successfully"
        )
    );
});

/**
 * PATCH /api/trips/:tripId/complete
 */
const completeTripController = asyncHandler(async (req, res) => {
    const { tripId } = req.params;

    const trip = await completeTrip(
        tripId,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            trip,
            "Trip completed successfully"
        )
    );
});

/**
 * PATCH /api/trips/:tripId/cancel
 */
const cancelTripController = asyncHandler(async (req, res) => {
    const { tripId } = req.params;

    const trip = await cancelTrip(tripId);

    return res.status(200).json(
        new ApiResponse(
            200,
            trip,
            "Trip cancelled successfully"
        )
    );
});

export {
    createTripController,
    getTripsController,
    getTripByIdController,
    dispatchTripController,
    completeTripController,
    cancelTripController,
};