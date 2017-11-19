class MarkovTweetsController < ApplicationController
  def create
    twitter_uid = params[:twitter_user_id]
    order = params[:order]

    tweet_data = TWITTER_CLIENT.get_tweets(twitter_uid).map do |tweet|
      tweet.full_text.split(' ')
    end
    message = MarkovChain.new(order, tweet_data).generate(35).join(' ')

    tweet = MarkovTweet.create!({
      twitter_user_id: twitter_uid,
      order: order,
      message: message
    })

    render json: tweet

  rescue Twitter::Error => e
    render status: 500, json: { message: e.message }
  end

  def show
    render json: MarkovTweet.find(params[:id])
  end

  def index
    render json: MarkovTweet.all
  end
end
