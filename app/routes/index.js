Balanced.IndexRoute = Balanced.AuthRoute.extend({
    redirect: function () {
        var marketplaceUri = $.cookie(Balanced.COOKIE.MARKETPLACE_URI);
        if (marketplaceUri) {
            this.transitionTo('activity', Balanced.Marketplace.find(marketplaceUri));
        } else {
            this.transitionTo('marketplaces');
        }
    }
});

Balanced.MarketplacesRoute = Balanced.AuthRoute.extend({
    setupController: function () {
        if (!Balanced.Auth.get('isGuest')) {
            return;
        }
        var guestUser = Balanced.Auth.get('user');
        //  get marketplaces so we have something to show
        Balanced.Marketplace.find('/v1/marketplaces').then(function (marketplaces) {
            if (!marketplaces.items.length) {
                return;
            }
            var guestMarketplace = Balanced.UserMarketplace.create({
                id: marketplaces.items[0].id,
                uri: marketplaces.items[0].uri,
                name: marketplaces.items[0].name
            });
            guestUser.get('user_marketplaces').pushObject(guestMarketplace);
        });

    }
});

Balanced.MarketplacesIndexRoute = Balanced.AuthRoute.extend({
    pageTitle: 'Marketplaces',

    setupController: function () {
        this.controllerFor('marketplace').set('content', null);
    }
});
