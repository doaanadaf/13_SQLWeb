const yts = require("yt-search");
const favoritesRepository = require('../repositories/favoritesRepository');

class VideosService {
  async search(query) {
    if (!query || !query.trim()) return [];

    const result = await yts(query);
    const videos = result.videos || [];

    return videos.slice(0, 12).map(v => ({
      videoId: v.videoId,
      title: v.title,
      channelTitle: v.author?.name || "Unknown",
      thumbnailUrl: v.thumbnail,
      url: v.url
    }));
  }

  getFavorites(userId) {
    return favoritesRepository.listByUser(userId);
  }

  addFavorite(userId, dto) {
    return favoritesRepository.add({ userId, ...dto });
  }

  removeFavorite(userId, favoriteId) {
    return favoritesRepository.remove({ userId, favoriteId });
  }
}

module.exports = new VideosService();
