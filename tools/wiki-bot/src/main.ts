import { CardTypeBuilder } from './wiki-bot/builder/card-type-builder';
import { ExpansionCardsMapBuilder } from './wiki-bot/builder/expansion-cards-map-builder';
import { ImagePool } from '@squoosh/lib';
import { ImageBuilder } from './wiki-bot/builder/image-builder';
import { CardTranslationBuilder } from './wiki-bot/builder/card-translation-builder';
import { CardDtoBuilder } from './wiki-bot/builder/card-dto-builder';
import { ExpansionTranslationBuilder } from './wiki-bot/builder/expansion-translation-builder';
import { ExpansionBuilder } from './wiki-bot/builder/expansion-builder';
import axios from 'axios';
import { DominionizerWikiBot } from './wiki-bot/dominionizer-wiki-bot';
import { WikiClient } from './wiki-bot/wiki-client/wiki-client';
import { CardTypeTranslationBuilder } from './wiki-bot/builder/card-type-translation-builder';

async function bootstrap(): Promise<void> {
    const axiosInstance = axios.create({
        baseURL: 'http://wiki.dominionstrategy.com/api.php',
        timeout: 60 * 1000,
    });
    const imagePool = new ImagePool();

    const targetPath = '../../src/assets/';
    const wikiClient = new WikiClient(axiosInstance);
    const expansionBuilder = new ExpansionBuilder();
    const expansionTranlationBuilder = new ExpansionTranslationBuilder();
    const cardTypeBuilder = new CardTypeBuilder();
    const cardTypeTranslationBuilder = new CardTypeTranslationBuilder();
    const expansionCardsMapBuilder = new ExpansionCardsMapBuilder();
    const cardDtoBuilder = new CardDtoBuilder();
    const cardTranslationBuilder = new CardTranslationBuilder();
    const imageBuilder = new ImageBuilder(wikiClient, imagePool);

    const bot = new DominionizerWikiBot(
        targetPath,
        wikiClient,
        expansionBuilder,
        expansionTranlationBuilder,
        cardTypeBuilder,
        cardTypeTranslationBuilder,
        expansionCardsMapBuilder,
        cardDtoBuilder,
        cardTranslationBuilder,
        imageBuilder,
    );

    try {
        await bot.generateAll();
    } finally {
        imagePool.close();
    }
}

bootstrap();
