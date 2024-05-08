from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from datetime import datetime 
app = Flask(__name__)


characters = [
   {
      "id":1, 
      "Chinese":"水",
      "English":"water",
      "pinyin":"shuǐ",
      "audio":"水.m4a",
      "evolutionImages":["水1.jpg", "水2.jpg","水3.jpg","水4.jpg","水5.jpg"],
      "video":["水.mov"],
  },

   {
      "id":2,
      
      "Chinese":"白",
      "English":"white",
      "pinyin":"bái",
      "audio":"白.m4a",
      "evolutionImages":["白1.png", "白2.png","白3.png","白4.png","白5.png"],
      "video":["白.mov"], 
  },

  {
      "id":3,
      "Chinese":"米",
      "English":"rice",
      "pinyin":"mǐ",
      "audio":"米.m4a",
      "evolutionImages":["米1.png", "米2.png","米3.png","米4.png","米5.png"],
      "video":["米.mov"],
  },

  {
      "id":4,
      "Chinese":"白米",
      "English":"white rice",
      "pinyin":"bái mǐ",
      "audio":"白米.m4a",
      "evolutionImages":["白米1.png", "白米2.png","白米3.png"],
      "video":["白.mov", "米.mov"],
  },

  {
      "id":5,
      "Chinese":"酒",
      "English":"wine",
      "pinyin":"jiǔ",
      "audio":"酒.m4a",
      "evolutionImages":["酒1.png", "酒2.png","酒3.png","酒4.png"],
      "video":["酒.mov"],
  },

   {
      "id":6,
      "Chinese":"白酒",
      "English":"white wine",
      "pinyin":"bái jiǔ",
      "audio":"白酒.m4a",
      "evolutionImages":["白酒1.png", "白酒2.png","白酒3.png"],
      "video":["白.mov", "酒.mov"]
  },


 {
      "id":7,
      "Chinese":"牛",
      "English":"bull",
      "pinyin":"niú",
      "audio":"牛.m4a",
      "evolutionImages":["牛1.png", "牛2.png","牛3.png","牛4.png","牛5.png"],
      "video":["牛.mov"],
  },


  {
      "id":8,
      "Chinese":"肉",
      "English":"meat",
      "pinyin":"ròu",
      "audio":"肉.m4a",
      "evolutionImages":["肉1.png", "肉2.png","肉3.png","肉4.png"],
      "video":["肉.mov"],
  },


  {
      "id":9,
      "Chinese":"牛肉",
      "English":"beef",
      "pinyin":"niú ròu",
      "audio":"牛肉.m4a",
      "evolutionImages":["牛肉1.png", "牛肉2.png","牛肉3.png"],
      "video":["牛.mov", "肉.mov"],
  },

  {
      "id":10,
      "Chinese":"羊",
      "English":"sheep",
      "pinyin":"yáng",
      "audio":"羊.m4a",
      "evolutionImages":["羊1.png", "羊2.png","羊3.png","羊4.png","羊5.png"],
      "video":["羊.mov"],
  },

  {
      "id":11,
      "Chinese":"羊肉",
      "English":"lamb",
      "pinyin":"yáng ròu",
      "audio":"羊肉.m4a",
      "evolutionImages":["羊肉1.png", "羊肉2.png","羊肉3.png"],
      "video":["羊.mov", "肉.mov"],
  },


  {
      "id":12,
      "Chinese":"魚",
      "English":"fish",
      "pinyin":"yú",
      "audio":"魚.m4a",
      "evolutionImages":["魚1.png", "魚2.png","魚3.png","魚4.png","魚5.png"],
      "video":["魚.mov"],
  },

  {
      "id":13,
      "Chinese":"魚肉",
      "English":"fish",
      "pinyin":"yú ròu",
      "audio":"魚肉.m4a",
      "evolutionImages":["魚肉1.png", "魚肉2.png","魚肉3.png"],
      "video":["魚.mov", "肉.mov"],
  },

   {
      "id":14,
      "Chinese":"菜",
      "English":"vegetable",
      "pinyin":"cài",
      "audio":"菜.m4a",
      "evolutionImages":["菜1.png", "菜2.png","菜3.png"],
      "video":["菜.mov"],
  },

   {
      "id":15,
      "Chinese":"大",
      "English":"big",
      "pinyin":"dà",
      "audio":"大.m4a",
      "evolutionImages":["大1.png", "大2.png","大3.png","大4.png","大5.png"],
      "video":["大.mov"],
  },

  {
      "id":16,
      "Chinese":"小",
      "English":"small",
      "pinyin":"xiǎo",
      "audio":"小.m4a",
      "evolutionImages":["小1.png", "小2.png","小3.png","小4.png","小5.png"],
      "video":["小.mov"],
  }
]

quizzes_1 = [
    {
      "id":1,
      "question":"Q1: Which character means “meat” in Chinese?",
      "keyWord":"meat",
      "options":["酒","牛","肉","魚"],
      "optionMeaning":["wine", "bull", "meat", "fish"],
      "correctAnswer": "3",
      "correctCharacter":"肉",
      "correct":"N",
      "answered":"N",
      "checked":"N"
      
    },

    {
      "id":2,
      "question":"Q2: Which character means “fish” in Chinese?",
      "keyWord":"fish",
      "options":["魚","米", "羊","大"],
      "optionMeaning":["fish", "rice", "goat", "big"],
      "correctAnswer": "1",
      "correctCharacter":"魚",
      "correct":"N",
      "answered":"N",
      "checked":"N"
    },

    {
      "id":3,
      "question":"Q3: Which character means “vegetable” in Chinese?",
      "keyWord":"“vegetable”",
      "options":["水","菜", "肉","小"],
      "optionMeaning":["water", "vegetable", "meat", "small"],
      "correctAnswer": "2",
      "correctCharacter":"菜",
      "correct":"N",
      "answered":"N",
      "checked":"N"
    },

    {
      "id":4,
      "question":"Q4: Which character means “big” in Chinese?",
      "keyWord":"big",
      "options":["大","菜", "小","羊"],
      "optionMeaning":["big", "vegetable", "small", "goat"],
      "correctAnswer": "1",
      "correctCharacter":"大",
      "correct":"N",
      "answered":"N",
      "checked":"N"
    },

    {
      "id":5,
      "question":"Q5: Which character means “water” in Chinese?",
      "keyWord":"water",
      "options":["魚","牛", "酒","水"],
      "optionMeaning":["fish", "bull", "wine", "water"],
      "correctAnswer": "4",
      "correctCharacter":"水",
      "correct":"N",
      "answered":"N",
      "checked":"N"
    },
]

quizzes_2 = [
   {
      "id":6,
      "question":"Q6: Drag and drop the corresponding image into the two characters (白米).",
      "images":["rice", "wine", "fish", "lamb"],
      "chi":["白米", "酒", "魚肉","羊肉"],
      "correctAnswer": "rice",
      "keyWord":"rice",
      "keyWordChi":"白米",
      "correct":"N",
      "answered":"N",
      "checked":"N",
      "x": "0px",
      "y": "0px"
    
   },

   {
      "id":7,
      "question":"Q7: Drag and drop the corresponding image into the two characters (牛肉).",
      "images":["vegetable", "wine", "fish", "beef"],
      "chi":["菜", "酒", "魚肉","牛肉"],
      "correctAnswer": "beef",
      "keyWord":"beef",
      "keyWordChi":"牛肉",
      "correct":"N",
      "answered":"N",
      "checked":"N",
      "x": "0px",
      "y": "0px"
    
   },

   {
      "id":8,
      "question":"Q8: Drag and drop the corresponding image into the two characters (白酒).",
      "images":["lamb", "wine", "vegetable", "rice"],
      "chi":["羊肉", "酒", "菜","米"],
      "correctAnswer": "wine",
      "keyWord":"wine",
      "keyWordChi":"白酒",
      "correct":"N",
      "answered":"N",
      "checked":"N",
      "x": "0px",
      "y": "0px"
    
   },

   {
      "id":9,
      "question":"Q9: Drag and drop the corresponding image into the two characters (魚肉).",
      "images":["water", "vegetable", "beef", "fish"],
      "chi":["水", "菜", "牛肉","魚肉"],
      "correctAnswer": "fish",
      "keyWord":"fish",
      "keyWordChi":"魚肉",
      "correct":"N",
      "answered":"N",
      "checked":"N",
      "x": "0px",
      "y": "0px"
    
   },

   {
      "id":10,
      "question":"Q10: Drag and drop the corresponding image into the two characters (羊肉).",
      "images":["wine", "lamb", "rice", "fish"],
       "chi":["酒", "羊肉", "米","魚肉"],
      "correctAnswer": "lamb",
      "keyWord":"lamb",
      "keyWordChi":"羊肉",
      "correct":"N",
      "answered":"N",
      "checked":"N",
      "x": "0px",
      "y": "0px"
    
   }
]


quizzes_3 = [
    {
      "id":11,
      "question":"Q11: Jose wants to order a small white wine. Based on the menu, how much will he need to pay?",
      "options":["$A","$C", "$H","$K"], 
      "correctAnswer": "4",
      "feedback":"Incorrect. Answer: $K.",
      "correct":"N",
      "answered":"N",
      "checked":"N"
     },

     {
      "id":12,
      "question":"Q12: Javier wants to order a large portion of fish. Based on the menu, how much will he need to pay?",
      "options":["$A","$B", "$C","$D"], 
      "correctAnswer": "3",
      "feedback":"Incorrect. Answer: $C.",
      "correct":"N",
      "answered":"N",
      "checked":"N"
     },

   
     {
      "id":13,
      "question":"Q13: Emily wants to order a small portion of lamb. Based on the menu, how much will she need to pay?",
      "options":["$B","$C", "$E","$F"], 
      "correctAnswer": "4",
      "feedback":"Incorrect. Answer: $F.",
      "correct":"N",
      "answered":"N",
      "checked":"N"
     },

     {
      "id":14,
      "question":"Q14: Stephen wants to order a large portion of beef with a vegetable. Based on the menu, how much will he need to pay?",
      "options":["$A + $2","$A + $3", "$D + $2","$D + $3"], 
      "correctAnswer": "2",
      "feedback":"Incorrect. Answer: $A + $3.",
      "correct":"N",
      "answered":"N",
      "checked":"N"
     },


     {
      "id":15,
      "question":"Q15: Kimmy wants to order a small portion of fish with rice. Based on the menu, how much will she need to pay?",
      "options":["$C + $2", "$D + $2","$E + $3","$F + $3"], 
      "correctAnswer": "2",
      "feedback":"Incorrect. Answer: $D + $2.",
      "correct":"N",
      "answered":"N",
      "checked":"N"
     }
     

    

]




# ROUTES
@app.route('/')
def home():
   return render_template('home.html', quizzes_1 = quizzes_1, quizzes_2 = quizzes_2, quizzes_3 = quizzes_3)  
 
@app.route('/learn/<int:id>')
def learn_page(id):
   
    learning_character = next((character for character in characters if character["id"] == id), None)
    
    if learning_character:
        
        learning_character["entryTimestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


        return render_template('learn.html', character_to_learn=learning_character, characters=characters)
    else:
        return "Character not found"


@app.route('/quiz_1/<int:id>', methods=["GET", "POST"])
def quiz1_page(id):
    print("-----------")
    print(quizzes_1)
    print("-----------")
    
    quiz = next((quiz for quiz in quizzes_1 if quiz["id"] == id), None)

    if request.method == 'GET':
      
      if quiz:
        return render_template('quiz_1.html', quiz=quiz, id=id)
      else:
          return "quiz not found"
      
    elif request.method == 'POST':
      data = request.json

      quiz["userAnswer"] = data
      if quiz["userAnswer"] == quiz["correctAnswer"]:
         quiz["correct"] = "Y"
      else:
         quiz["correct"] = "N"
      
      print(quizzes_1)

      return quiz

    

@app.route('/quiz_2/<int:id>', methods=["GET", "POST"])
def quiz2_page(id):
    quiz = next((quiz for quiz in quizzes_2 if quiz["id"] == id), None)

    if request.method == 'GET':
      if quiz:
        return render_template('quiz_2.html', quiz=quiz, id=id)
      else:
          return "quiz not found"
      
    elif request.method == 'POST':
      data = request.json
     
      quiz["userAnswer"] = data["draggableClassSuffix"]
      if quiz["userAnswer"] == quiz["correctAnswer"]:
         quiz["correct"] = "Y"
      else:
         quiz["correct"] = "N"
    
    #   save x y position
      quiz["x"] = data["left"]
      quiz["y"] = data["top"]
      print("--------")
      print(quiz)
      print("--------")

      return quiz
    

@app.route('/quiz_3/<int:id>', methods=["GET", "POST"])
def quiz3_page(id):

  
    quiz = next((quiz for quiz in quizzes_3 if quiz["id"] == id), None)

    if request.method == 'GET':
      if quiz:
        return render_template('quiz_3.html', quiz=quiz, id=id)
      else:
          return "quiz not found"
      
    elif request.method == 'POST':
      data = request.json

      quiz["userAnswer"] = data
      if quiz["userAnswer"] == quiz["correctAnswer"]:
         quiz["correct"] = "Y"
      else:
         quiz["correct"] = "N"
      return quiz
 
from collections import defaultdict

@app.route('/result')
def result():
    total_correct_1 = sum(1 for quiz in quizzes_1 if quiz["correct"] == "Y")
    total_correct_2 = sum(1 for quiz in quizzes_2 if quiz["correct"] == "Y")
    total_correct_3 = sum(1 for quiz in quizzes_3 if quiz["correct"] == "Y")
    total_correct = total_correct_1 + total_correct_2 + total_correct_3

    # Initialize variables to store questions
    correct_questions = []
    incorrect_questions = []

    # Extract questions from quizzes_1
    for quiz in quizzes_1:
        if quiz["correct"] == "Y":
            correct_questions.append(quiz["question"])
        else:
            incorrect_questions.append(quiz["question"])

      # Extract questions from quizzes_2
    for quiz in quizzes_2:
        if quiz["correct"] == "Y":
              correct_questions.append(quiz["question"])
        else:
              incorrect_questions.append(quiz["question"])

      # Extract questions from quizzes_3
    for quiz in quizzes_3:
        if quiz["correct"] == "Y":
              correct_questions.append(quiz["question"])
        else:
              incorrect_questions.append(quiz["question"])

    return render_template('result.html', total_correct=total_correct, correct_questions=correct_questions, incorrect_questions=incorrect_questions)


@app.route('/transition')
def transition_page():
    return render_template('transition.html')

def reset_answers(quizzes):
    for quiz in quizzes:
        quiz['correct'] = 'N'
        quiz['answered'] = 'N'
        quiz['checked'] = 'N'
        quiz['userAnswer'] = None

        if quizzes == quizzes_2 :
            quiz['x'] = '0px'
            quiz['y'] = '0px'


@app.route('/resetAnswers', methods=["POST"])
def reset_page():
 
    # set the 'correct' field to 'N' for quizzes_1, quizzes_2, quizzes_3
    global quizzes_1, quizzes_2, quizzes_3  
 
    reset_answers(quizzes_1)
    reset_answers(quizzes_2)
    reset_answers(quizzes_3)
    
    return jsonify({'message': 'updated successfully'})



@app.route('/updateCheckedAnswered/<int:id>', methods=["POST"])
def save_status_page(id):
      
    for quiz in quizzes_1:
        if quiz["id"] == id:
            quiz["answered"] = "Y"
            quiz["checked"] = "Y"
            break

   
    for quiz in quizzes_2:
        if quiz["id"] == id:
            quiz["answered"] = "Y"
            quiz["checked"] = "Y"
            break


    for quiz in quizzes_3:
        if quiz["id"] == id:
            quiz["answered"] = "Y"
            quiz["checked"] = "Y"
            break

    return jsonify({"message": f"Question with ID {id} updated successfully."})
      


@app.route('/updateAnswered/<int:id>', methods=["GET","POST"])
def save_answered_page(id):
    
    if request.method == 'POST':
        for quiz in quizzes_1:
            if quiz["id"] == id:
                quiz["answered"] = "Y"
                break

    
        for quiz in quizzes_2:
            if quiz["id"] == id:
                quiz["answered"] = "Y"
                break


        for quiz in quizzes_3:
            if quiz["id"] == id:
                quiz["answered"] = "Y"
                break
        
  
        # return jsonify({"message": f"Question with ID {id} updated successfully."})   
        return quiz
     

    if request.method == 'GET':
        # Extracting answered quizzes
        unanswered_questions = [quiz for quiz_list in [quizzes_1, quizzes_2, quizzes_3] for quiz in quiz_list if quiz["answered"] == "N"]

        return jsonify(unanswered_questions)



if __name__ == '__main__':
   app.run(debug = True)




