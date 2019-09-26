const Divisor = {
  name: 'divisor',
  template: `
  <div class="item">
    <label>{{label}}</label>
    <input type="text" 
      :value='value'
      @input="$emit('input', $event.target.value)">
      <slot/>
    </div>
  `,
  props: [
    'label',
    'value'
  ],
  data: function ()
  {
    return {

    }
  },
}


const Dropdown = {
  name: "Dropdown",
  template: `
  <div class='dropdown'>
    <div class="button btn" 
          @click="showMenu = !showMenu">
      
      <div class="title">{{selectedOption.name}}</div>

      <div class="icon">arrow_drop_down</div>
    </div>

    <div class="menu" v-if="showMenu">
      <div class="option btn"
            v-for="(option, index) of options"
            :key="index" :value="option.value"
            @click="optionClick(option)">
        {{option.name}}
      </div>
    </div>   
  </div>
  `,
  props:
  {
    options: Array,
    placeholder: String
  },
  data: function ()
  {
    return {
      showMenu: false,
      selectedOption:
      {},
    }
  },
  methods:
  {
    optionClick(option)
    {
      this.selectedOption = option;
      this.$emit('selected', option);
      this.showMenu = false;
    },
    setDefaults()
    {
      if (!this.options)
      {
        this.selectedOption = {
          value: undefined,
          name: "no options..."
        }
      }
      else if (this.placeholder)
      {
        this.selectedOption = {
          value: undefined,
          name: this.placeholder
        }
      }
      else
      {
        this.selectedOption = this.options[0];
      }
    }
  },
  mounted: function ()
  {
    this.setDefaults();
  }
}


const app = new Vue(
{
  el: '#app',
  components:
  {
    'dropdown': Dropdown,
    'divisor': Divisor,
  },
  data:
  {
    title: 'Vue works!',
    options: [
    {
      value: "distance",
      name: "Distance"
    },
    {
      value: "weight",
      name: "Weight"
    },
    {
      value: "speed",
      name: "Speed"
    },
    {
      value: "temperature",
      name: "Temperature"
    }],
    selectedOption:
    {},

    mi: 1,
    yd: 0,
    ft: 0,
    inch: 0,
    km: 0,
    m: 0,
    cm: 0,
    lb: 1,
    oz: 0,
    kg: 0,
    g: 0,
    st: 0,
    mph: 1,
    kph: 0,
    knots: 0,
    mach: 0,
    f: 32,
    c: 0,
    k: 0,
  },
  methods:
  {
    newOption(option)
    {
      this.selectedOption = option;
      console.log(this.selectedOption);

      switch (this.selectedOption.value)
      {
        case "distance":
          this.convertMiles();
          break;
        case "weight":
          this.convertPounds();
          break;
        case "speed":
          this.convertMPH();
          break;
        case "temperature":
          this.convertF();
          break;
        default:
          // code block
      }
    },

    // #region distance
    convertFeet()
    {
      this.mi = parseFloat((this.ft * 0.00018939).toFixed(2));
      this.yd = parseFloat((this.ft * 0.33333).toFixed(2));
      this.inch = parseFloat((this.ft * 12).toFixed(2));
      this.km = parseFloat((this.ft / 3280.8).toFixed(2));
      this.m = parseFloat((this.ft / 3.2808).toFixed(2));
      this.cm = parseFloat((this.ft / 0.032808).toFixed(2));
    },

    convertMeters()
    {
      this.mi = parseFloat((this.m * 0.00062137).toFixed(2));
      this.yd = parseFloat((this.m * 1.0936).toFixed(2));
      this.ft = parseFloat((this.m * 3.2808).toFixed(2));
      this.inch = parseFloat((this.m * 39.370).toFixed(2));
      this.km = parseFloat((this.m / 1000).toFixed(2));
      this.cm = parseFloat((this.m / 0.01).toFixed(2));
    },

    convertInches()
    {
      this.mi = parseFloat((this.inch * 0.000015783).toFixed(2));
      this.yd = parseFloat((this.inch * 0.027778).toFixed(2));
      this.ft = parseFloat((this.inch * 0.083333).toFixed(2));
      this.km = parseFloat((this.inch / 39370).toFixed(2));
      this.m = parseFloat((this.inch / 39.370).toFixed(2));
      this.cm = parseFloat((this.inch / 0.39370).toFixed(2));
    },

    convertCentimeters()
    {
      this.mi = parseFloat((this.cm * 0.0000062137).toFixed(2));
      this.yd = parseFloat((this.cm * 0.010936).toFixed(2));
      this.ft = parseFloat((this.cm * 0.032808).toFixed(2));
      this.inch = parseFloat((this.cm * 0.39370).toFixed(2));
      this.km = parseFloat((this.cm / 100000).toFixed(2));
      this.m = parseFloat((this.cm / 100).toFixed(2));
    },

    convertYards()
    {
      this.mi = parseFloat((this.yd * 0.00056818).toFixed(2));
      this.ft = parseFloat((this.yd * 3).toFixed(2));
      this.inch = parseFloat((this.yd * 36).toFixed(2));
      this.km = parseFloat((this.yd / 1093.6).toFixed(2));
      this.m = parseFloat((this.yd / 1.0936).toFixed(2));
      this.cm = parseFloat((this.yd / 0.010936).toFixed(2));
    },

    convertKilometers()
    {
      this.mi = parseFloat((this.km * 0.62137).toFixed(2));
      this.yd = parseFloat((this.km * 1093.6).toFixed(2));
      this.ft = parseFloat((this.km * 3280.8).toFixed(2));
      this.inch = parseFloat((this.km * 39370).toFixed(2));
      this.m = parseFloat((this.km * 1000).toFixed(2));
      this.cm = parseFloat((this.km * 100000).toFixed(2));
    },

    convertMiles()
    {
      this.yd = parseFloat((this.mi * 1760).toFixed(2));
      this.ft = parseFloat((this.mi * 5280).toFixed(2));
      this.inch = parseFloat((this.mi * 63360).toFixed(2));
      this.km = parseFloat((this.mi / 0.62137).toFixed(2));
      this.m = parseFloat((this.mi / 0.00062137).toFixed(2));
      this.cm = parseFloat((this.mi / 0.0000062137).toFixed(2));
    },
    // #endregion distance

    // #region weight
    convertPounds()
    {
      this.kg = parseFloat((this.lb / 2.2046).toFixed(2));
      this.oz = parseFloat((this.lb * 16).toFixed(2));
      this.g = parseFloat((this.lb / 0.0022046).toFixed(2));
      this.st = parseFloat((this.lb * 0.071429).toFixed(2));
    },

    convertKilograms()
    {
      this.lb = parseFloat((this.kg * 2.2046).toFixed(2));
      this.oz = parseFloat((this.kg * 35.274).toFixed(2));
      this.g = parseFloat((this.kg * 1000).toFixed(2));
      this.st = parseFloat((this.kg * 0.1574).toFixed(2));
    },

    convertOunces()
    {
      this.lb = parseFloat((this.oz * 0.0625).toFixed(2));
      this.kg = parseFloat((this.oz / 35.274).toFixed(2));
      this.g = parseFloat((this.oz / 0.035274).toFixed(2));
      this.st = parseFloat((this.oz * 0.0044643).toFixed(2));
    },

    convertGrams()
    {
      this.lb = parseFloat((this.g * 0.0022046).toFixed(2));
      this.kg = parseFloat((this.g / 1000).toFixed(2));
      this.oz = parseFloat((this.g * 0.035274).toFixed(2));
      this.st = parseFloat((this.g * 0.00015747).toFixed(2));
    },

    convertStones()
    {
      this.lb = parseFloat((this.st * 14).toFixed(2));
      this.kg = parseFloat((this.st / 0.15747).toFixed(2));
      this.oz = parseFloat((this.st * 224).toFixed(2));
      this.g = parseFloat((this.st / 0.00015747).toFixed(2));
    },
    // #endregion weight

    // #region speed
    convertMPH()
    {
      this.kph = parseFloat((this.mph * 1.609344).toFixed(2));
      this.mach = parseFloat((this.mph / 761.207).toFixed(2));
      this.knots = parseFloat((this.mph / 1.150779).toFixed(2));
    },

    convertKPH()
    {
      this.mph = parseFloat((this.kph / 1.609344).toFixed(2));
      this.mach = parseFloat((this.kph / 1225.044).toFixed(2));
      this.knots = parseFloat((this.kph / 1.852).toFixed(2));
    },

    convertKnots()
    {
      this.mph = parseFloat((this.knots * 1.150779).toFixed(2));
      this.kph = parseFloat((this.knots * 1.852).toFixed(2));
      this.mach = parseFloat((this.knots / 661.4708).toFixed(2));
    },

    convertMach()
    {
      this.mph = parseFloat((this.mach * 761.207).toFixed(2));
      this.kph = parseFloat((this.mach * 1225.044).toFixed(2));
      this.knots = parseFloat((this.mach * 661.4708).toFixed(2));
    },
    // #endregion speed

    // #region temperature
    convertF()
    {
      this.c = parseFloat(((this.f - 32) / 1.8).toFixed(2));
      this.k = parseFloat((((this.f - 32) / 1.8) + 273.15).toFixed(2));
    },

    convertC()
    {
      this.f = parseFloat(((this.c * 1.8) + 32).toFixed(2));
      this.k = parseFloat((this.c * 1 + 273.15).toFixed(2));
    },

    convertK()
    {
      this.f = parseFloat((((this.k - 273.15) * 1.8) + 32).toFixed(2));
      this.c = parseFloat((this.k - 273.15).toFixed(2));
    },
    // #endregion temperature    

  },
  mounted()
  {
    this.selectedOption = this.options[0];
    this.convertMiles();
  }
});
