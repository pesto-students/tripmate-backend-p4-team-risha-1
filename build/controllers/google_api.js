"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlaces = void 0;
const axios = require('axios');
const router = require('express').Router();
const fetchPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("in fetch api");
        const location = req.body.location; //'16.6629739,74.2061816';
        const radius = req.body.radius; //'4000';
        const type = req.body.type; //'tourist_attraction';
        const response = yield axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAMK3vI-Vqdf6l-EwT7xTw3UF-3npnKBGY&location=' + location +
            '&radius=' + radius + '&type=' + type);
        console.log(response);
        res.status(200).json(response.data);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
});
exports.fetchPlaces = fetchPlaces;
