1. Model

2. View

3. Router

預設 Backbone.Router 能幫我們處理 hash fragments (#) 的網址。

如果你希望真實的對應伺服端的網址時，那麼就要在 Backbone.history.start() 中，代入 pushState 這個屬性。