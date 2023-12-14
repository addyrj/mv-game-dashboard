const express = require('express');
const router = express.Router();
const { varifyJwtToken, varifyGameToken } = require('../helper/jwtHelper');

const gameController = require('../controllers/gameController');

// API => GET
router.get(
   '/get-game-user-info',
   varifyGameToken,
   gameController.getGameUserInfo
);
router.get('/get-all-games', gameController.getAllGames);
router.get('/get-single-game', gameController.getSingleGameInfo);
router.get('/get-cooming-soon-games', gameController.getCommingSoonGames);
router.get('/get-single-game-comments', gameController.getSingleGameComments);
router.get('/search-game', gameController.SearchGames);
router.get('/get-query-games', gameController.getQeuryGames);
router.get(
   '/get-recent-games',
   varifyJwtToken,
   gameController.getRecentPlayGames
);
router.get(
   '/get-favorite-games',
   varifyJwtToken,
   gameController.getUserFavoriteGames
);
router.get('/get-top-rated-games', gameController.getTopRatedGames);
router.get('/get-single-provider-games', gameController.getProvidersGames);
router.get('/get-all-games-lists', gameController.getAllGamesLists);
router.get('/get-popular-games', gameController.getPopularGames);
router.get('/get-filter-by-name-games', gameController.filterByNameGames);
router.get(
   '/get-all-game-providers',
   gameController.getAllGamesProviersWithGameCounts
);
router.get('/all-games-list', gameController.allGamesLists);
router.get('/get-new-releases-games', gameController.getNewReleasesGames);

// API => POST
router.post(
   '/genrate-game-token',
   varifyJwtToken,
   gameController.genrateGameToken
);

router.post('/genrate-game-refresh-token', gameController.genrateRefreshToken);

router.post(
   '/favorite-game',
   varifyJwtToken,
   gameController.FavoriteGameHandler
);
router.post('/like-game', varifyJwtToken, gameController.GameLikeHandler);
router.post('/new-comment', varifyJwtToken, gameController.GameCommentHandler);
router.post(
   '/get-selected-provider-games',
   gameController.getSelectedProviderGames
);

// API => PATCH
router.patch(
   '/like-game-comments',
   varifyJwtToken,
   gameController.likeGameComment
);
router.patch(
   '/store-recent-games',
   varifyJwtToken,
   gameController.storeRecentGames
);

// API => DELETE
router.delete(
   '/delete-single-recent-play-games',
   varifyJwtToken,
   gameController.deleteSingleRecentGame
);

module.exports = router;
