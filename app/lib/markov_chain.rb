class MarkovChain
  def initialize(order, states_list)
    @order = order
    @graph = WeightedGraph.new
    states_list.each do |states|
      states.each_with_index do |state, idx|
        upstream = if idx == 0
                     nil
                   else
                    min = [idx - order, 0].max
                    states[min...idx]
                   end
        @graph.add(upstream, state)
      end
    end
  end

  def generate(length)
    chain = []

    next_state = generate_next_state(chain)

    for _ in 0...length do
      break if next_state.nil?
      chain << next_state
      next_state = generate_next_state(chain)
    end

    chain
  end

  private

  def generate_next_state(chain)
    upstream = if chain.length == 0
                 nil
               else
                min = [chain.length - @order, 0].max
                chain[min...chain.length]
               end

    random = rand()
    so_far = 0
     @graph.list(upstream).each do |vertex|
      if so_far + vertex.weight > random
        return vertex.to
      end
      so_far += vertex.weight
    end
    nil
  end
end
