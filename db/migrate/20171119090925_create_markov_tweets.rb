class CreateMarkovTweets < ActiveRecord::Migration[5.0]
  def change
    create_table :markov_tweets do |t|
      t.string :twitter_user_id, null: false
      t.integer :order, null: false
      t.string :message, null: false
      t.timestamps

      t.index :twitter_user_id
    end
  end
end
