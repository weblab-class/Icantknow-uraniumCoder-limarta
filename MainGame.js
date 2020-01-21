


  function createMainGame(res, Game, Rule, Element){
    const water = new Element({
      name: "water",
    });
    water.save();
    const air = new Element({
      name: "air",
    });
    air.save();
    const steam = new Element({
      name: "steam",
    });
    steam.save();
    const makeSteam = new Rule({
      reactants: ["water", "air"],
      products: ["steam"],
    })
    makeSteam.save();
    const basicGame = new Game({
      owner: "mainGame",
      reactionRules: [makeSteam._id],
      startingElements: ["water", "air"],
    });
    basicGame.save();
    res.send({"msg": "successfully initiated main game!"});
  }

module.exports = {
  createMainGame,
};
