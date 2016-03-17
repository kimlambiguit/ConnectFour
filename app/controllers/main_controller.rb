class MainController < ApplicationController
	def index
		@board = Board.new(6,7)
	end
end
