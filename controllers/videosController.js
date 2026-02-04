const videosService = require("../services/videosService");

class VideosController {
  async page(req, res) {
    const userId = req.session.user.id;
    const q = req.query.q || "";

    const [results, favorites] = await Promise.all([
      videosService.search(q),
      videosService.getFavorites(userId)
    ]);

    res.render("videos", { q, results, favorites });
  }

  async add(req, res) {
    const userId = req.session.user.id;
    console.log("ADD body:", req.body);

    const { videoId, title, channelTitle, thumbnailUrl, currentQuery } = req.body;

    try {
      await videosService.addFavorite(userId, { videoId, title, channelTitle, thumbnailUrl });
      console.log("ADD OK");
    } catch (e) {
      console.log("ADD ERROR:", e.message);
    }

    res.redirect("/videos?q=" + encodeURIComponent(currentQuery || ""));
  }

  async remove(req, res) {
    const userId = req.session.user.id;
    const favoriteId = req.params.id;
    const q = req.query.q || "";

    try {
      await videosService.removeFavorite(userId, favoriteId);
    } catch (e) {
      console.log("REMOVE ERROR:", e.message);
    }

    res.redirect("/videos?q=" + encodeURIComponent(q));
  }
}

module.exports = new VideosController();
