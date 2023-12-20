import string
from src.mechanics.card import Card
from src.util.gpt_call import gpt_client
### The translation package ###
from deep_translator import GoogleTranslator
###


def get_visual_description(card: Card) -> str:
    segments = []
    subject_line = get_full_subject_description(card)
    segments.append(subject_line)
    segments.append(f"It can be found in {card.style.environment}-like environments.")
    message = " ".join(segments)
    return message


def get_image_prompt(card: Card):

    segments = []
    #⭐️#⭐️# Working at translating the whole subject line into english for the image prompt! #⭐️#⭐️#
    subject_line = get_subject_description(card)
    subject_line = GoogleTranslator(source='auto', target='en').translate(subject_line)

    if card.rarity.index == 1:
        subject_line += "::1.8"

    if card.rarity.index >= 2:
        subject_line += "::2.5"

    subject_line += get_detail_description(card)
    segments.append(subject_line)
    segments.append(f"in a {card.style.environment} environment")
    segments.append(card.style.ambience)
    segments.append(card.style.style_suffix)

    message = ", ".join(segments)
    message += " --ar 3:2"
    message = message.replace("  ", " ")
    message = message.replace(" ,", ",")

    message = f"{card.name}::0 " + message
    return message

##Adjust the prompt
def get_subject_description(card: Card):
    
    subject_section = ["a"]
    subject_section.extend(card.style.subject_adjectives)
    subject_section.append(card.style.subject)
    subject_section.append(card.style.subject_type)
    subject_line = " ".join(subject_section)
    subject_line = subject_line.replace(" ,", ",")

    return subject_line


def get_detail_description(card: Card) -> str:
    # Skip this if the card is a basic.
    if card.style.detail and card.rarity.index > 0:
        return ", " + card.style.detail
    else:
        return ""


def get_full_subject_description(card: Card):
    subject_line = get_subject_description(card)
    subject_line += get_detail_description(card)
    return subject_line


def generate_card_name(card: Card, seen_names: set[str]) -> str:

    if not gpt_client().is_openai_enabled:
        return "Untitled Card"

    # Generate a name for the card.
    # additional_modifier = "(max 2 words), "
    if card.rarity.index == 0:
        additional_modifier = "short, single-word, "
    else:
        additional_modifier = "single-word, "
    
    ### There prompts are later to be generated inside API calls for english or japanese depending on a conditioal switch in React

    # #🇺🇸#🇺🇸# Adding a mod to translate all the text into 
    # prompt = f"Generate a unique, orignal, creative,{additional_modifier} {card.style.subject_type} name for a {get_visual_description(card)}"
    # prompt += f" (without using the word {card.style.subject_type.lower()} or {card.element.name.lower()}):\n"
    # #🇺🇸#🇺🇸#

    #🇯🇵#🇯🇵# This is the Japanese prompt for name #🇯🇵#🇯🇵#
    prompt = f"This prompt will have two steps first identify the japanese word in this prompt and incorporate the subject into the name you will give me. next (using the Japanese language)　"
    prompt += f"Generate a unique, orignal, creative,{additional_modifier} {card.style.subject_type} easy to read (using simple kanji) pokemon like name for a {get_visual_description(card)} in Japanese"
    prompt += f"(without using the word {card.style.subject_type.lower()} or {card.element.name.lower()}):\n"
    prompt += f"Check to make sure that the name has no mention of the word pokemon in any way this includes the word 'poke' :\n"
    prompt += f"only return this name that is being generated in katakana:\n"
    #🇯🇵#🇯🇵# This is the Japanese prompt for name #🇯🇵#🇯🇵#

    print(prompt)
    response = gpt_client().get_completion(prompt, max_tokens=256, n=5)

    potential_names = set()
    for potential_name in response.choices:
        name = potential_name.text
        name = name.strip()
        name = "".join([c for c in name if c.isalpha() or c == " " or c == "-"])
        name = string.capwords(name)
        potential_names.add(name)

    # Pick the shortest name.
    filtered_names = set(potential_names) - seen_names
    if len(filtered_names) > 0:
        potential_names = filtered_names

    potential_names = sorted(potential_names, key=lambda x: len(x))
    name = potential_names[0]
    return name


def generate_desc(card: Card) -> str:
    #🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵
    #🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈#
    # Generate a name for the monster.
    if gpt_client().is_openai_enabled:
        #🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸
        # prompt = f"Generate a short, original, creative Pokedex description for {card.name}, {get_visual_description(card)}. "
        # prompt += f"It has the following abilities: {', '.join([ability.name for ability in card.abilities])}. "
        # prompt += f"Be creative about its day-to-day life. "
        # prompt += f" (do not use the word {card.style.subject.lower()} or {card.element.name.lower()} or the word pokemon or the name {card.name} or the ability names):\n"
        #🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸#🇺🇸
        #🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵
        # 1️⃣ first translate the english using deep translator
        japanese_description = get_visual_description(card)
        japanese_description = GoogleTranslator(source='auto', target='en').translate(japanese_description)
        # 2️⃣ Generate a Japanese description that is shorter than 20 characters.
        # Emphasize environmental awareness and avoid specific words in Japanese.
        prompt = f"{card.name}、{japanese_description}。"
        prompt += "環境への意識を強調し、20文字以下で表現してください。"
        # 3️⃣ Avoid using specific words in Japanese.
        prompt += f" (以下の単語を使用しないでください：{card.style.subject}、{card.element.name}、ポケモン、{card.name}、"
        prompt += f"{', '.join([ability.name for ability in card.abilities])}という単語を使用しないでください):\n"
        prompt += f"日本語で20文字以下で表現してください。"
        # 🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵
        print(prompt)
        response = gpt_client().get_completion(prompt, max_tokens=256)
        desc = response.choices[0].text
        desc = desc.strip()
        return desc
    else:
        return "No description available."
    #🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵🇯🇵
    #🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈##🌈#🌈#
