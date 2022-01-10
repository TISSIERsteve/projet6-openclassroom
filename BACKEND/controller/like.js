const Sauce = require("../models/Sauce") // Je récupère mon model des likes

// =========================================== LIKE =====================================================
exports.createLike = (req, res) => {
    // Je récupère sauce avec son
    Sauce.findOne({
        _id: req.params.id
    })
        .then(sauce => {
            // Si like aime
            if (req.body.like === 1) {
                if (!sauce.userLiked.includes(req.body.userId || !sauce.dislikes.includes(req.body.userId))) {
                    sauce.likes++
                    sauce.userLiked.push(req.body.userId)
                    sauce.save()

                }
            }
            // si like n'aime pas
            if (req.body.like === -1) {
                sauce.dislikes--
                sauce.userDisliked.push((req.body.userId))
                console.log("J'aime pas");
                sauce.save()

            }
            // Si annule son like
            if (req.body.like === 0) {
                if (sauce.userLiked.indexOf(req.body.userId) != -1) {
                    sauce.like--
                    sauce.userLiked.splice(sauce.userLiked.indexOf(req.body.userId), 1)
                } else {
                    sauce.dislikes--
                    sauce.userDisliked.splice(sauce.userDisliked.indexOf(req.body.userId), 1)
                }
                sauce.save()
            }

            res.status(200).json({ message: "Like ajouter" })
        })
        .catch(error => {
            console.log("like refuser");
            res.status(500).json({ message: "erreur sur le like" })
        })
}