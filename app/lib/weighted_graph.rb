class WeightedGraph
  def initialize
    @vertices = {}
  end

  def add(from_node, to_node)
    @vertices[from_node] ||= Counter.new
    @vertices[from_node].add(to_node)
  end

  def list(from_node)
    vertices = @vertices[from_node]
    if vertices.nil?
      []
    else
      total = vertices.total.to_f
      vertices.counts.map do |to_node, count|
        Vertex.new(from_node, to_node, count / total)
      end
    end
  end
end

Vertex = Struct.new('Vertex', :from, :to, :weight)
