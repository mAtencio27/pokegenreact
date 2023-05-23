from src.mechanics.element import Element


class PokemonElements:
    NEUTRAL = Element(
        "Neutral",
        ascii_color="\033[37m",
        is_neutral=True,
    )
    FIRE = Element(
        "Fire",
        ascii_color="\033[31m",
    )
    WATER = Element(
        "Water",
        ascii_color="\033[34m",
    )
    GRASS = Element(
        "Grass",
        ascii_color="\033[32m",
    )
    ELECTRIC = Element(
        "Electric",
        ascii_color="\033[33m",
    )
    PSYCHIC = Element(
        "Psychic",
        ascii_color="\033[35m",
    )
    FIGHTING = Element(
        "Fighting",
        ascii_color="\033[31m",
    )
    FAIRY = Element(
        "Fairy",
        ascii_color="\033[31m",
    )
    DARK = Element(
        "Dark",
        ascii_color="\033[31m",
    )
    DRAGON = Element(
        "Dragon",
        ascii_color="\033[31m",
    )
    METAL = Element(
        "Metal",
        ascii_color="\033[31m",
    )

    ALL = [NEUTRAL, FIRE, WATER, GRASS, ELECTRIC, PSYCHIC, FIGHTING, FAIRY, DARK, DRAGON, METAL]
    _ELEMENTS_BY_NAME = {element.name.lower(): element for element in ALL}

    def get_element_by_name(name: str) -> Element:
        return PokemonElements._ELEMENTS_BY_NAME[name.lower()]


def get_resist(element: Element) -> Element:
    if element == PokemonElements.FIRE:
        return PokemonElements.GRASS
    elif element == PokemonElements.WATER:
        return PokemonElements.FIRE
    elif element == PokemonElements.GRASS:
        return PokemonElements.ELECTRIC
    elif element == PokemonElements.PSYCHIC:
        return PokemonElements.FIGHTING
    elif element == PokemonElements.FAIRY:
        return PokemonElements.PSYCHIC
    elif element == PokemonElements.DARK:
        return PokemonElements.PSYCHIC
    elif element == PokemonElements.DRAGON:
        return PokemonElements.GRASS
    elif element == PokemonElements.METAL:
        return PokemonElements.FAIRY
    else:
        return None


def get_weakness(element: Element) -> Element:
    if element == PokemonElements.FIRE:
        return PokemonElements.WATER
    elif element == PokemonElements.WATER:
        return PokemonElements.ELECTRIC
    elif element == PokemonElements.GRASS:
        return PokemonElements.FIRE
    elif element == PokemonElements.ELECTRIC:
        return PokemonElements.FIGHTING
    elif element == PokemonElements.NEUTRAL:
        return PokemonElements.FIGHTING
    elif element == PokemonElements.FIGHTING:
        return PokemonElements.PSYCHIC
    elif element == PokemonElements.FAIRY:
        return PokemonElements.METAL
    elif element == PokemonElements.DARK:
        return PokemonElements.FAIRY
    elif element == PokemonElements.DRAGON:
        return PokemonElements.FAIRY
    elif element == PokemonElements.METAL:
        return PokemonElements.METAL
    else:
        return None
