class MarkovTweetsController < ApplicationController
  def create
    twitter_uid = params[:twitter_user_id]
    order = params[:order]

    tweet_data = TWITTER_CLIENT.get_tweets(twitter_uid).map do |tweet|
      tweet.full_text.split(' ')
    end

    message = MarkovChain.new(order, tweet_data).generate(35).join(' ')

    render json: { message: message }

  rescue Twitter::Error => e
    render status: 500, json: { message: e.message }
  end
end
