class Counter
  attr_reader :total, :counts

  def initialize
    @counts = {}
    @total = 0
  end

  def add(thing)
    @counts[thing] ||= 0
    @counts[thing] += 1
    @total += 1
  end
end
