def create_table(n=3):
  table = []
  for i in range(n):
    row = []
    for j in range(n):
      row.append(" ")
    table.append(row)  

  return table


def check_string(str1,size):
  
    game_over = 0
    winner = "-"
    
    if "OOO" in str1 and size == 3:
      game_over = 1
      winner = "O"
   
    elif "XXX" in str1 and size == 3:
      game_over = 1
      winner = "X"

    return game_over,winner


def is_game_over(game_table):
  size = len(game_table[0])

  game_over = 0
  winner = "-"
  
  #row and column
  for i in range(size):
    row_str =""
    column_str = ""
    for j in range(size):
      row_str += game_table[i][j]
      column_str += game_table[j][i]

      if game_over != 1:
        game_over,winner = check_string(row_str,size)
      else:
        break

      if game_over != 1:
        game_over,winner = check_string(column_str,size)
      else:
        break

  #diagonals
  if game_over != 1:
    borders_left = []
    borders_right = []

    for i in range(size):
      row1 = (0,i)
      column1 = (i,0)

      if row1 not in borders_left:
        borders_left.append(row1)
      
      if column1 not in borders_left:
        borders_left.append(column1)


      row2 = (0,i)
      column2 = (i,size-1)

      if row2 not in borders_right:
        borders_right.append(row2)
      
      if column2 not in borders_right:
        borders_right.append(column2)   
      
    
    for border in borders_left:
      diagonal_str = ""
      x = border[0]
      y = border[1]
      while (x in range(size)) and (y in range(size)):
        diagonal_str += game_table[x][y]
        x += 1
        y += 1

        if game_over != 1:
          game_over,winner = check_string(diagonal_str,size)
        else:
          break
      

    
    for border in borders_right:
      diagonal_str = ""
      x = border[0]
      y = border[1]
      while (x in range(size)) and (y in range(size)):
        diagonal_str += game_table[x][y]
        x += 1
        y -= 1

        if game_over != 1:
          game_over,winner = check_string(diagonal_str,size)
        else:
          break             

  #draw condition --> if no winner and no empty space
  if game_over != 1 and (sum(row.count(" ") for row in game_table)) == 0:
    game_over = 1

  return game_over,winner    


def minimax(maximum,game_table, depth, symbol,ai_symbol):
    
    if symbol == 'X':
      other_symbol = 'O'
    else:
      other_symbol = 'X'  
    
    game_over,winner = is_game_over(game_table)
    size = len(game_table)
    
    if game_over == 1:
        if winner == ai_symbol:
            return 1
        elif winner == "-":
            return 0
        else:
            return -1
    else:

      if maximum:
          max_eval = -100000
          for i in range(size):
              for j in range(size):
                  if game_table[i][j] == " ":
                      game_table[i][j] = symbol
                      eval = minimax(False,game_table, depth + 1, other_symbol,ai_symbol)
                      
                      game_table[i][j] = " "
                      max_eval = max(max_eval, eval)
          
          return max_eval
      else:
          min_eval = 100000
          for i in range(size):
              for j in range(size):
                  if game_table[i][j] == " ":
                      game_table[i][j] = symbol
                      eval = minimax(True,game_table, depth + 1, other_symbol,ai_symbol)
                      
                      game_table[i][j] = " "
                      min_eval = min(min_eval, eval)
          
          return min_eval



def ai_move(game_table, symbol):
    if symbol == 'X':
        other_symbol = 'O'
    else:
        other_symbol = 'X'
    
    size = len(game_table)
    bestScore = -100000  # Set to a very low value to maximize
    bestLocation = (-1, -1)
    
    for i in range(size):
        for j in range(size):
            if game_table[i][j] == " ":
                # Assume the AI plays here
                game_table[i][j] = symbol
                # Here, 'False' since the AI is starting this evaluation round
                score = minimax(False, game_table, 0, other_symbol, symbol)
                game_table[i][j] = " "  # Undo move
                
                # Now find the highest score
                if score > bestScore:
                    bestScore = score
                    bestLocation = (i, j)
    
    # Place the AI's move on the best location
    game_table[bestLocation[0]][bestLocation[1]] = symbol
    
    return game_table


def initializer(size):
  game_table = create_table(size)
  
  user_symbol = input("Choose the symbol: “X” or “O”  --> ")
  
  while user_symbol not in "xXoO":
    user_symbol = input("Please select: “X” or “O”  --> ")

  user_symbol = user_symbol.upper()

  return game_table,user_symbol



def get_location(game_table,user_symbol):
  
  size = len(game_table[0])
  
  location_x,location_y = input("Please Enter The Coorinates You Want To Play On: ").split(",")
  location_x = int(location_x)
  location_y = int(location_y)

  while ((0 > location_x or  location_x >= size) and (0 > location_y or  location_y >= size)) or game_table[location_x][location_y] != " ":
    
    if (0 > location_x or  location_x >= size) and (0 > location_y or  location_y >= size): 
      print("Please Enter Between 0 -",size-1,":",end="")
    
    elif game_table[location_x][location_y] != " ": 
      print("Please Enter Free Cell: ")
    
    location_x,location_y = input(" ").split(",")
    location_x = int(location_x)
    location_y = int(location_y)


  game_table[location_x][location_y] = user_symbol

  return game_table


def print_table(game_table):
  size = len(game_table)

  print(" ",end="")
  for i in range(size):
    print("  ",i,end="")
  print("")
  print("   ------------")  

  for i in range(size):
    print(i,end="")
    for j in range(size):
      print(" |",game_table[i][j],end="")
    print(" |")
    print("   ------------")

      

def game_play(game_table,user_symbol):
    game_over = 0
    winner = "-"

    if user_symbol == "X":
      ai_symbol = "O"
    else:
      ai_symbol = "X"

    while(game_over != 1):
      print_table(game_table)
      game_table = get_location(game_table,user_symbol)
      game_over,winner = is_game_over(game_table)

      if(game_over != 1):
        print_table(game_table)
        #game_table = get_location(game_table,ai_symbol)
        game_table = ai_move(game_table,ai_symbol)
        game_over,winner = is_game_over(game_table)

    print_table(game_table)
    if winner != "-":
      print("Winner is",winner)
    else:
      print("No Winner --- Draw")      




game_table,user_symbol = initializer(3)
game_play(game_table,user_symbol)